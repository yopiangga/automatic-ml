import { Button, Table } from "react-daisyui";

export function TableComponent({ header, action, data }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head className="bg-primary-main text-white">
          {header.map((item, index) => {
            return <span key={`title_${index}`}>{item.name}</span>;
          })}
        </Table.Head>

        <Table.Body>
          {data.map((item, index) => {
            return (
              <Table.Row key={`row_${index}`}>
                {header.map((headerItem, headerIndex) => {
                  if (headerItem.code === "action")
                    return (
                      <span
                        className="flex gap-1 text-white"
                        key={`row_${index}_${headerIndex}`}
                      >
                        {action.map((a, aIndex) => {
                          return (
                            <Button
                              key={`row_${index}_${headerIndex}_${aIndex}`}
                              color={a.color}
                              className="text-white"
                              size="xs"
                              onClick={() => a.callback(item.id)}
                            >
                              {a.name}
                            </Button>
                          );
                        })}
                      </span>
                    );
                  else if (headerItem.type == "boolean")
                    return (
                      <span key={`row_${index}_${headerIndex}`}>
                        {item[headerItem.code] ? "Yes" : "No"}
                      </span>
                    );
                  else if (headerItem.type == "image")
                    return (
                      <span key={`row_${index}_${headerIndex}`}>
                        <img
                          className="h-10"
                          src={item[headerItem.code]}
                          // alt={item[headerItem.code]}
                        />
                      </span>
                    );
                  else
                    return (
                      <span key={`row_${index}_${headerIndex}`}>
                        {item[headerItem.code]}
                      </span>
                    );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
