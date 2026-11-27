// Screenshots open enlarged over the page; a click anywhere or Esc closes them.
// Without this script the link opens the picture on its own.
(() => {
  const box = document.createElement("div");
  box.className = "lightbox";
  box.hidden = true;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.innerHTML = '<img alt=""><p class="lightbox-caption"></p>';
  document.body.appendChild(box);
  const img = box.querySelector("img");
  const caption = box.querySelector(".lightbox-caption");

  const close = () => {
    box.hidden = true;
    document.body.classList.remove("lightbox-open");
  };
  box.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !box.hidden) close();
  });

  document.querySelectorAll("a.zoom").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const small = a.querySelector("img");
      img.src = a.href;
      img.alt = small ? small.alt : "";
      caption.textContent = small ? small.alt : "";
      box.hidden = false;
      document.body.classList.add("lightbox-open");
    });
  });
})();
