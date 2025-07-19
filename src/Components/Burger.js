import styles from "./Burger.module.css";

export default function Burger({ setIsActive, isActive }) {
  return (
    <div className={styles["nav"]}>
      <div
        className={styles["menu-btn"]}
        onClick={() => setIsActive((prev) => !prev)}
      >
        <div
          className={`${styles["menu-btn__burger"]} ${
            isActive
              ? styles["burger-menu-active"]
              : styles["burger-menu-inactive"]
          }`}
        />
      </div>
    </div>
  );
}
