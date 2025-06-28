import { Button, Pagination } from "react-daisyui";

export function PaginationComponent({ active, data, callback }) {
  return (
    <Pagination>
      {data.map((item, index) => {
        return (
          <Button
            key={index}
            onClick={() => {
              callback(index);
            }}
            className={`join-item ${index == active ? "btn-primary" : ""}`}
          >
            {item}
          </Button>
        );
      })}
    </Pagination>
  );
}
