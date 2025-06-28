import { Button, Stats } from "react-daisyui";

export function StatsDefaultComponent({
  icon,
  title,
  value,
  size = "",
  actions,
}) {
  return (
    <Stats className="bg-white shadow-s1">
      <Stats.Stat>
        <Stats.Stat.Item variant="figure" className=" text-secondary">
          <div className="bg-primary-main rounded-full w-14 h-14 flex justify-center items-center text-white">
            {icon}
          </div>
        </Stats.Stat.Item>
        <Stats.Stat.Item variant="title">{title}</Stats.Stat.Item>
        <Stats.Stat.Item variant="value" className={size}>
          {value}
        </Stats.Stat.Item>
        {actions != null ? (
          <div className="stat-actions">
            <Button size="sm" color="neutral" onClick={actions}>
              Change
            </Button>
          </div>
        ) : null}
      </Stats.Stat>
    </Stats>
  );
}
