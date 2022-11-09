import { useContext } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../hooks/CartContext";

import styles from "./Navbar.module.scss";

const MobileNav = ({ open, setOpen }) => {
  return (
    <div
      className={`${styles.nav_container__mobile_nav} ${
        open ? styles.epic : styles.notepic
      }`}
    >
      <div className={styles.nav_container__mobile_nav__items}>
        <NavLink
          className={styles.mobile_item}
          onClick={() => setOpen(!open)}
          to="/"
        >
          {({ isActive }) => (
            <span className={isActive ? styles.active : ""}>Home</span>
          )}
        </NavLink>
        <NavLink
          className={styles.mobile_item}
          onClick={() => setOpen(!open)}
          to="/brands"
        >
          {({ isActive }) => (
            <span className={isActive ? styles.active : ""}>Brands</span>
          )}
        </NavLink>
        <NavLink
          className={styles.mobile_item}
          onClick={() => setOpen(!open)}
          to="/favourites"
        >
          {({ isActive }) => (
            <span className={isActive ? styles.active : ""}>Favourites</span>
          )}
        </NavLink>
        <NavLink
          className={styles.mobile_item}
          onClick={() => setOpen(!open)}
          to="/cart"
        >
          {({ isActive }) => (
            <span className={isActive ? styles.active : ""}>Cart</span>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export const NavBar = () => {
  const [cart] = useContext(CartContext);

  const [open, setOpen] = useState(false);
  return (
    <nav className={styles.nav_container}>
      <MobileNav open={open} setOpen={setOpen} />
      <div className={styles.nav_container__items_container}>
        <div
          className={styles.nav_container__items_container__items}
          onClick={() => {
            setOpen(!open);
          }}
        >
          {/* hamburger button */}
          <span
            className={`${
              styles.nav_container__items_container__items_hamburger
            } ${open && styles.hambuger__top_transition}`}
          />
          <span
            className={`${
              styles.nav_container__items_container__items_hamburger
            } ${open && styles.hambuger__middle_transition}`}
          />
          <span
            className={`${
              styles.nav_container__items_container__items_hamburger
            } ${open && styles.hambuger__bottom_transition}`}
          />
        </div>

        <div className={styles.nav_container__items_container_horizontal}>
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/brand">Brands</CustomLink>
          <CustomLink to="/favourites">Favourites</CustomLink>
          <CustomLink to="/cart">
            {cart.length > 0 ? (
              <div className={styles.cart}>
                Cart <div className={styles.notification}>{cart.length}</div>
              </div>
            ) : (
              "Cart"
            )}
          </CustomLink>
        </div>
      </div>
    </nav>
  );
};

const CustomLink = ({ to, children }) => {
  return (
    <NavLink to={to} className={styles.link_item}>
      {({ isActive }) => (
        <span className={isActive ? styles.active : ""}>{children}</span>
      )}
    </NavLink>
  );
};

export default NavBar;
