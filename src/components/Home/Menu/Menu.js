import "./Menu.css";

const items = [
  {
    no: "01",
    name: "Crispy Chicken",
    desc: "Golden, crunchy and loaded with our house sauce.",
    price: "₹249",
    tag: "BESTSELLER",
    icon: "🍗",
  },
  {
    no: "02",
    name: "Loaded Fries",
    desc: "Crispy fries, creamy sauce, herbs and serious comfort.",
    price: "₹179",
    tag: "FAVOURITE",
    icon: "🍟",
  },
  {
    no: "03",
    name: "Fresh Smash Burger",
    desc: "Juicy patty, soft bun, melted cheese and house pickles.",
    price: "₹229",
    tag: "NEW",
    icon: "🍔",
  },
];

function Menu() {
  return (
    <section className="menu-section" id="menu">
      <div className="section-head">
        <div>
          <div className="section-label">02 — WHAT'S COOKING</div>
          <h2>Our <em>favourites.</em></h2>
        </div>
        <p>Small menu. Big personality.<br />Always made fresh.</p>
      </div>

      <div className="menu-grid">
        {items.map((item) => (
          <article className="menu-card" key={item.no}>
            <div className="menu-card-top">
              <span>{item.no}</span>
              <span className="menu-tag">{item.tag}</span>
            </div>
            <div className="food-icon">{item.icon}</div>
            <h3>{item.name}</h3>
            <p>{item.desc}</p>
            <div className="menu-bottom">
              <strong>{item.price}</strong>
              <button aria-label={`Order ${item.name}`}>+</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Menu;
