import { Robot } from "@/Contexts/Teams";
import styles from "./style.module.scss";

const Robots = ({ robots }: { robots: Robot[] }) => (
  <>
    {robots.map(({ id, name, avatar, winner }) => (
      <div
        key={id}
        className={`${styles.wrapper} ${winner ? styles.winner : ""}`}
      >
        <img src={avatar} alt="Robot image" className={styles.robotImage} />
        <div>{name}</div>
      </div>
    ))}
  </>
);
export { Robots };
