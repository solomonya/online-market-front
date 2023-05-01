import { Button, Flex } from "@chakra-ui/react";
import { ShowList } from "../other/ShowList";

const Pagination = ({ count, onUpdate, currentPage, pagesInGroup }) => {
  const pages = Array.from({ length: Math.ceil(count / pagesInGroup) }, (_, index) => index + 1);

  return (
    <Flex gap={3}>
      <ShowList list={pages}>
        {(page) => (
          <Button
            key={page}
            colorScheme={page === currentPage ? "green" : "gray"}
            onClick={() => onUpdate(page)}
          >
            {page}
          </Button>
        )}
      </ShowList>
    </Flex>
  );
};

export { Pagination };
