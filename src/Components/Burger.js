import styles from "./Burger.module.css";

export default function Burger({ menuIsActive, setMenuIsActive }) {
  return (
    <div className={styles["nav"]}>
      <div
        className={styles["menu-btn"]}
        onClick={() => setMenuIsActive((prev) => !prev)}
      >
        <div
          className={`${styles["menu-btn__burger"]} ${
            menuIsActive
              ? styles["burger-menu-active"]
              : styles["burger-menu-inactive"]
          }`}
        />
      </div>
    </div>
  );
}
