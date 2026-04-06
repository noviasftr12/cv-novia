$(document).ready(function(){

  // ======================
  // LOAD PAGE SPA
  // ======================
  function loadPage(page){
    $("#content").fadeOut(200, function(){
      $("#content").load(page, function(){
        $("#content").fadeIn(200);
      });
    });
  }

  // Load awal
  loadPage("home.html");

  // Klik menu
  $(document).on("click", ".menu", function(e){
    e.preventDefault();

    $(".menu").removeClass("active");
    $(this).addClass("active");

    let page = $(this).data("page");
    loadPage(page);
  });


  // ======================
  // GITHUB API
  // ======================
  $(document).on("click", "#loadGithub", function(){

    let user = $("#username").val();
    $("#githubResult").html("Loading...");

    $.ajax({
      url: "https://api.github.com/users/" + user,
      success: function(data){
        $("#githubResult").html(`
          <img src="${data.avatar_url}" width="100"><br>
          <b>${data.name}</b><br>
          Username: ${data.login}<br>
          Repository: ${data.public_repos}<br>
          Followers: ${data.followers}
        `);
      },
      error: function(){
        $("#githubResult").html("<span style='color:red'>User tidak ditemukan</span>");
      }
    });

  });


  // ======================
  // CONTACT FORM + VALIDASI
  // ======================
  $(document).on("submit", "#contactForm", function(e){
    e.preventDefault();

    let nama = $("#nama").val();
    let email = $("#email").val();
    let pesan = $("#pesan").val();

    let valid = true;

    $(".error").text("");

    if(nama === ""){
      $("#errNama").text("Nama wajib diisi");
      valid = false;
    }

    if(email === "" || !email.includes("@")){
      $("#errEmail").text("Email tidak valid");
      valid = false;
    }

    if(pesan.length < 5){
      $("#errPesan").text("Pesan minimal 5 karakter");
      valid = false;
    }

    if(valid){
      localStorage.setItem("nama", nama);
      localStorage.setItem("email", email);
      localStorage.setItem("pesan", pesan);

      alert("Pesan berhasil disimpan!");
    }
  });


  // ======================
  // LOAD DATA LOCAL STORAGE
  // ======================
  $(document).on("focus", "#nama, #email, #pesan", function(){
    $("#nama").val(localStorage.getItem("nama"));
    $("#email").val(localStorage.getItem("email"));
    $("#pesan").val(localStorage.getItem("pesan"));
  });

});$(document).ready(function(){

  // ======================
  // LOADING SPINNER GLOBAL
  // ======================
  function showLoading(){
    $("#content").html(`
      <div class="flex justify-center items-center py-10">
        <div class="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    `);
  }

  // ======================
  // TOAST NOTIFICATION
  // ======================
  function showToast(message, type="success"){
    let bg = type === "success" ? "bg-green-500" : "bg-red-500";

    let toast = $(`
      <div class="fixed top-5 right-5 ${bg} text-white px-4 py-2 rounded-lg shadow-lg z-50">
        ${message}
      </div>
    `);

    $("body").append(toast);

    setTimeout(() => {
      toast.fadeOut(500, function(){ $(this).remove(); });
    }, 2000);
  }

  // ======================
  // LOAD PAGE SPA
  // ======================
  function loadPage(page){
    showLoading();

    setTimeout(() => {
      $("#content").load(page, function(){
        $("#content").hide().fadeIn(300);
      });
    }, 300);
  }

  // Load awal
  loadPage("home.html");

  // ======================
  // NAVIGATION MENU
  // ======================
  $(document).on("click", ".menu", function(e){
    e.preventDefault();

    $(".menu").removeClass("menu-active");
    $(this).addClass("menu-active");

    let page = $(this).data("page");
    loadPage(page);
  });


  // ======================
  // GITHUB API (UI UPGRADE)
  // ======================
  $(document).on("click", "#loadGithub", function(){

    let user = $("#username").val();

    if(user === ""){
      $("#githubResult").html(`<p class="text-red-500">Username wajib diisi</p>`);
      return;
    }

    $("#githubResult").html(`
      <div class="flex justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
      </div>
    `);

    $.ajax({
      url: "https://api.github.com/users/" + user,
      success: function(data){
        $("#githubResult").html(`
          <div class="text-center mt-4">
            <img src="${data.avatar_url}" 
                 class="w-24 h-24 rounded-full mx-auto border-4 border-blue-500 shadow-md mb-3">

            <h3 class="text-lg font-semibold">${data.name || data.login}</h3>
            <p class="text-gray-500">@${data.login}</p>

            <div class="flex justify-center gap-3 mt-3 text-sm">
              <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                Repo: ${data.public_repos}
              </span>
              <span class="bg-green-100 text-green-600 px-3 py-1 rounded-full">
                Followers: ${data.followers}
              </span>
            </div>

            <a href="${data.html_url}" target="_blank"
               class="inline-block mt-3 text-blue-500 hover:underline text-sm">
               Lihat GitHub
            </a>
          </div>
        `);
      },
      error: function(){
        $("#githubResult").html(`<p class="text-red-500">User tidak ditemukan</p>`);
      }
    });

  });


  // ======================
  // CONTACT FORM VALIDATION
  // ======================
  $(document).on("submit", "#contactForm", function(e){
    e.preventDefault();

    let nama = $("#nama").val();
    let email = $("#email").val();
    let pesan = $("#pesan").val();

    let valid = true;

    $(".error").text("");

    if(nama === ""){
      $("#errNama").text("Nama wajib diisi");
      valid = false;
    }

    if(email === "" || !email.includes("@")){
      $("#errEmail").text("Email tidak valid");
      valid = false;
    }

    if(pesan.length < 5){
      $("#errPesan").text("Pesan minimal 5 karakter");
      valid = false;
    }

    if(valid){
      localStorage.setItem("nama", nama);
      localStorage.setItem("email", email);
      localStorage.setItem("pesan", pesan);

      showToast("Pesan berhasil disimpan!");
    } else {
      showToast("Periksa kembali form!", "error");
    }
  });


  // ======================
  // AUTO LOAD LOCAL STORAGE
  // ======================
  $(document).on("focus", "#nama, #email, #pesan", function(){
    $("#nama").val(localStorage.getItem("nama"));
    $("#email").val(localStorage.getItem("email"));
    $("#pesan").val(localStorage.getItem("pesan"));
  });

});