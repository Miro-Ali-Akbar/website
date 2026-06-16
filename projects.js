document.getElementById('projects-container').innerHTML = `
<h2 id="projects">Projects</h2>
<div style="display:flex;gap:20px;align-items:flex-start;margin:30px;">
  <p style="margin:0;padding:0;"><a href="https://github.com/Miro-Ali-Akbar/Ink" title="Github link" target="_blank" style="font-size:1.17em;font-weight:bold;color:var(--black);text-decoration:none;">Ink</a> - A daily todo script that opens a dated markdown file in your terminal editor and renders it as your GNOME wallpaper on save. Used as a daily todo list and reminder that work is never done. Written in bash with a Python stdlib renderer</p>
  <div class="project-preview" onclick="openLightbox(this.querySelector('img'))">
    <img src="images/ink-preview.png" alt="Ink preview">
  </div>
</div>
<h3><a href="https://github.com/Miro-Ali-Akbar/dotfiles" title="Github link" target="_blank">dotfiles</a></h3>

<div style="display:flex;gap:20px;align-items:flex-start;margin:30px;">
  <p style="margin:0;padding:0;"><a href="https://github.com/Miro-Ali-Akbar/IT-Uppsala-Exams" title="Github link" target="_blank" style="font-size:1.17em;font-weight:bold;color:var(--black);text-decoration:none;">IT-Uppsala-Exams</a> - A sourced public collection of exams given in courses taken in the IT program at Uppsala University. Used to help study and features as of writing over 600 exams from 44 courses</p>
  <div style="width:160px;height:43px;flex-shrink:0;"></div>
</div>

<h3><a href="https://github.com/Miro-Ali-Akbar/Mood-Learning" title="Github link" target="_blank">Mood-Learning</a></h3>
<h3><a href="https://github.com/Miro-Ali-Akbar/guide-to-my-life" title="Github link" target="_blank">guide-to-my-life</a></h3>

<div style="display:flex;gap:20px;align-items:flex-start;margin:30px;">
  <p style="margin:0;padding:0;"><a href="https://github.com/Miro-Ali-Akbar/YAGF" title="Github link" target="_blank" style="font-size:1.17em;font-weight:bold;color:var(--black);text-decoration:none;">YAGF</a> - Yet-Another-Github-Filler is an automated script designed to artificially increase the amount of commits done thus boosting the users github front page contribution graph. Written as a simple bash script designed using git predating and gh cli to produce pull requests and comments</p>
  <div class="project-preview" onclick="openLightbox(this.querySelector('img'))">
    <img src="images/YAGF-preview.png" alt="YAGF preview">
  </div>
</div>

<div style="display:flex;gap:20px;align-items:flex-start;margin:30px;">
  <p style="margin:0;padding:0;"><a href="https://github.com/Miro-Ali-Akbar/eduprint-uu-linux-v1.2" title="Github link" target="_blank" style="font-size:1.17em;font-weight:bold;color:var(--black);text-decoration:none;">eduprint-uu-linux-v1.2</a> - An updated script to access Uppsala universities printer service eduprint that now works on fedora</p>
  <div style="width:160px;height:43px;flex-shrink:0;"></div>
</div>
`;
