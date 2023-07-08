import { Text, Button } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 300;

  if (!children) return null;
  if (children.length <= limit) return <Text>{children}</Text>;

  const summary = expanded ? children : children.substring(0, limit) + "...";

  return (
    <Text>
      {summary}
      <Button
        onClick={() => setExpanded(!expanded)}
        size="xs"
        marginLeft="1"
        fontWeight="bold"
        colorScheme="yellow"
      >
        {expanded ? "show less" : "read more"}
      </Button>
    </Text>
  );
};

export default ExpandableText;
