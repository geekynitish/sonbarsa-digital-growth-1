// Custom Decap CMS media library: uploads go straight to the R2 bucket
// behind img.sonbarsa.com via the sonbarsa-media-upload Worker, instead of
// Decap's default behaviour of committing image files into git.
//
// Auth: reuses the GitHub access token Decap itself already stored in
// localStorage after OAuth login (key "decap-cms-user"). We never embed a
// secret in this file — the Worker verifies that token against the GitHub
// API on every request. See workers/r2-media-upload/worker.js.
(function () {
  function getGitHubToken() {
    try {
      var raw = window.localStorage.getItem("decap-cms-user");
      if (!raw) return null;
      var user = JSON.parse(raw);
      return (user && user.token) || null;
    } catch (e) {
      return null;
    }
  }

  function uploadFile(file, uploadUrl) {
    var token = getGitHubToken();
    if (!token) {
      return Promise.reject(new Error("Sign in to Decap CMS first."));
    }
    var formData = new FormData();
    formData.append("file", file, file.name);

    return fetch(uploadUrl, {
      method: "POST",
      headers: { Authorization: "token " + token },
      body: formData,
    }).then(function (res) {
      if (!res.ok) {
        return res
          .json()
          .catch(function () {
            return { error: res.statusText };
          })
          .then(function (body) {
            throw new Error(body.error || "Upload failed (" + res.status + ")");
          });
      }
      return res.json();
    });
  }

  function buildPicker(onUpload, onCancel) {
    var overlay = document.createElement("div");
    overlay.style.cssText =
      "position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;" +
      "display:flex;align-items:center;justify-content:center;font-family:sans-serif;";

    var box = document.createElement("div");
    box.style.cssText =
      "background:#fff;border-radius:8px;padding:24px;width:360px;max-width:90vw;" +
      "box-shadow:0 10px 40px rgba(0,0,0,.3);";

    var title = document.createElement("h2");
    title.textContent = "Upload image";
    title.style.cssText = "margin:0 0 4px;font-size:16px;";

    var subtitle = document.createElement("p");
    subtitle.textContent = "Uploads directly to img.sonbarsa.com — no git commit.";
    subtitle.style.cssText = "margin:0 0 16px;font-size:12px;color:#666;";

    var input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.cssText = "display:block;width:100%;margin-bottom:16px;";

    var status = document.createElement("div");
    status.style.cssText = "font-size:13px;color:#666;min-height:18px;margin-bottom:12px;";

    var buttons = document.createElement("div");
    buttons.style.cssText = "display:flex;justify-content:flex-end;gap:8px;";

    var cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel";
    cancelBtn.style.cssText =
      "padding:8px 14px;border:1px solid #ccc;background:#fff;border-radius:6px;cursor:pointer;";

    var uploadBtn = document.createElement("button");
    uploadBtn.type = "button";
    uploadBtn.textContent = "Upload";
    uploadBtn.style.cssText =
      "padding:8px 14px;border:none;background:#1b3fae;color:#fff;border-radius:6px;cursor:pointer;";

    buttons.appendChild(cancelBtn);
    buttons.appendChild(uploadBtn);
    box.appendChild(title);
    box.appendChild(subtitle);
    box.appendChild(input);
    box.appendChild(status);
    box.appendChild(buttons);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    function close() {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }

    cancelBtn.addEventListener("click", function () {
      close();
      onCancel();
    });

    uploadBtn.addEventListener("click", function () {
      var file = input.files && input.files[0];
      if (!file) {
        status.textContent = "Choose an image file first.";
        return;
      }
      uploadBtn.disabled = true;
      cancelBtn.disabled = true;
      status.textContent = "Uploading…";
      onUpload(file, {
        onSuccess: function () {
          close();
        },
        onError: function (err) {
          uploadBtn.disabled = false;
          cancelBtn.disabled = false;
          status.textContent = (err && err.message) || "Upload failed.";
        },
      });
    });

    return { close: close };
  }

  window.CMS.registerMediaLibrary({
    name: "r2",
    init: function (args) {
      var options = (args && args.options) || {};
      var handleInsert = args && args.handleInsert;
      var uploadUrl = options.upload_url;
      var activePicker = null;

      return Promise.resolve({
        show: function () {
          if (!uploadUrl) {
            window.alert("config.yml is missing media_library.upload_url");
            return;
          }
          if (activePicker) return;
          activePicker = buildPicker(
            function (file, cb) {
              uploadFile(file, uploadUrl)
                .then(function (data) {
                  activePicker = null;
                  cb.onSuccess();
                  handleInsert(data.url);
                })
                .catch(function (err) {
                  cb.onError(err);
                });
            },
            function () {
              activePicker = null;
            }
          );
        },
        hide: function () {
          if (activePicker) {
            activePicker.close();
            activePicker = null;
          }
        },
        enableStandalone: function () {
          return true;
        },
      });
    },
  });
})();
