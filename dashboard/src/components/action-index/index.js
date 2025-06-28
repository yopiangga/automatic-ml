import { Button, Input } from "react-daisyui";
import { useNavigate } from "react-router-dom";

export function ActionIndex({ handleSearch, labelButton, routeActionButton }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2">
      <form className="flex lg:col-span-1 col-span-2" onSubmit={handleSearch}>
        <Input
          bordered
          type="text"
          placeholder="Search"
          className="w-full md:w-auto bg-base-100 rounded-lg"
        />
        <Button className="ml-2" color="ghost">
          Search
        </Button>
      </form>
      <div className="flex lg:justify-end justify-start lg:col-span-1 col-span-2 mt-4 lg:mt-0">
        <Button
          className="bg-primary-main text-white"
          color="neutral"
          onClick={() => {
            navigate(routeActionButton);
          }}
        >
          {labelButton}
        </Button>
      </div>
    </div>
  );
}
