(() => {
  const data = window.SHIGUANG;
  const cover = book => `<div class="cover" style="--cover:${book.tone[0]};--cover-light:${book.tone[1]}" aria-label="《${book.title}》封面"><span class="cover-label">SHIGUANG · ${book.genre}</span><span class="cover-title">${book.title}</span></div>`;
  const bookLink = book => `categories/${book.category}.html`;
  const featureCard = book => `<article class="feature-book" data-tags="${book.tags.join(' ')}">${cover(book)}<div class="book-info"><h3><a href="${bookLink(book)}"><span class="genre-label">[${book.genre}]</span>${book.title}</a></h3><p>${book.desc}</p><div class="book-meta"><span>${book.author}</span><span>${book.status}</span></div></div></article>`;
  const categoryCard = category => `<a class="category-card" href="categories/${category.slug}.html"><em>↗</em><strong>${category.name}</strong><span>${category.note}</span></a>`;
  const set = (id, html) => { const node = document.getElementById(id); if (node) node.innerHTML = html; };
  set('featured-books', data.books.slice(0, 4).map(featureCard).join(''));
  set('new-books', data.books.slice(4, 7).map(book => `<article class="new-card"><a href="${bookLink(book)}">${cover(book)}</a><div class="new-copy"><h3><a href="${bookLink(book)}">${book.title}</a></h3><p>${book.desc}</p><span class="book-meta">${book.author} · ${book.status}</span></div></article>`).join(''));
  set('category-links', data.categories.map(categoryCard).join(''));
  set('popular-books', data.books.slice(7).map(book => `<article class="popular-item"><a href="${bookLink(book)}">${cover(book)}</a><div><h3><a href="${bookLink(book)}">${book.title}</a></h3><p>${book.genre} · ${book.author}</p></div></article>`).join(''));
  set('ranking-list', data.ranking.map((title, i) => `<li><span class="rank-num">${String(i + 1).padStart(2, '0')}</span><a href="${bookLink(data.books.find(book => book.title === title) || data.books[i])}">${title}</a><span class="rank-status">${i < 3 ? '人气' : i < 5 ? '连载' : '新书'}</span></li>`).join(''));
  set('editor-list', data.editors.map((title, i) => `<a href="${bookLink(data.books[i + 2])}">${title}<span>值得一读 ↗</span></a>`).join(''));
  set('side-tags', data.categories.slice(0, 6).map(category => `<a href="categories/${category.slug}.html">${category.name}</a>`).join(''));

  document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
    document.querySelectorAll('.feature-book').forEach(card => card.hidden = tab.dataset.filter !== 'all' && !card.dataset.tags.includes(tab.dataset.filter));
  }));

  const form = document.querySelector('.search');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    const query = form.elements.q.value.trim().toLocaleLowerCase();
    const status = document.getElementById('search-status');
    document.getElementById('search-status')?.remove();
    if (!query) return;
    const matches = data.books.filter(book => `${book.title} ${book.author} ${book.genre} ${book.desc}`.toLocaleLowerCase().includes(query));
    const target = document.getElementById('featured-books');
    if (!target) { window.location.href = `../index.html?q=${encodeURIComponent(query)}`; return; }
    const message = document.createElement('p'); message.id = 'search-status'; message.className = 'search-status';
    message.textContent = matches.length ? `找到 ${matches.length} 本相关作品` : '暂未找到相关作品，试试其他书名或关键词。';
    target.before(message); target.innerHTML = matches.length ? matches.map(featureCard).join('') : '<div class="empty-state">没有匹配的作品，换个关键词看看吧。</div>';
  });

  const initialQuery = new URLSearchParams(window.location.search).get('q');
  if (initialQuery && form) { form.elements.q.value = initialQuery; form.requestSubmit(); }

  const detail = document.querySelector('[data-category-page]');
  if (detail) {
    const category = data.categories.find(item => item.slug === detail.dataset.categoryPage);
    const books = data.books.filter(book => book.category === detail.dataset.categoryPage);
    if (category) {
      document.title = `${category.name}小说推荐_免费阅读 - 拾光小说`;
      set('category-books', books.map(book => `<article class="category-book">${cover(book)}<div><h2><a href="#read">${book.title}</a></h2><p>${book.desc}</p><div class="book-meta"><span>${book.author}</span><span>${book.status}</span><span>${book.genre}</span></div></div><a class="read-button" href="#read">开始阅读</a></article>`).join(''));
      const count = document.getElementById('category-count'); if (count) count.textContent = `${category.count}部`;
    }
  }

  const backTop = document.querySelector('.back-top');
  if (backTop) { window.addEventListener('scroll', () => backTop.classList.toggle('visible', window.scrollY > 360), { passive: true }); backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })); }
})();
