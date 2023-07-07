import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <NavBar />
      <Box padding={5}>
        <Heading>woops</Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? "page dont exist mate!"
            : "unexpected error occured"}
        </Text>
      </Box>
    </>
  );
};

export default ErrorPage;
