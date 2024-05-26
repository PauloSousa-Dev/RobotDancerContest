import type { Robot } from "@/Contexts/Teams";
import styles from "./style.module.scss";
import { Image } from "@/components/Image";

const Robots = ({ robots }: { robots: Robot[] }) => (
  <>
    {robots.map(({ id, name, avatar, winner }) => (
      <div
        key={id}
        className={`${styles.wrapper} ${winner ? styles.winner : ""}`}
      >
        <Image src={avatar} alt="Robot image" className={styles.robotImage} />
        <div>{name}</div>
      </div>
    ))}
  </>
);
export { Robots };
