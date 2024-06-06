import { Container, Text, VStack, Heading, Button, Box, SimpleGrid } from "@chakra-ui/react";
import { FaRocket } from "react-icons/fa";
import { useEvents } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: events, error, isLoading } = useEvents();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading events: {error.message}</Text>;
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Welcome to Your New React App</Heading>
        <Text fontSize="xl">This is your starting point. Begin building something amazing!</Text>
        <Button leftIcon={<FaRocket />} colorScheme="teal" size="lg">
          Get Started
        </Button>
      </VStack>
      <Box mt={10} width="100%">
        <Heading as="h2" size="lg" mb={4}>Events</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {events.map(event => (
            <Box key={event.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
              <Heading fontSize="xl">{event.name}</Heading>
              <Text mt={4}>Date: {new Date(event.date).toLocaleDateString()}</Text>
              <Text mt={4}>Venue ID: {event.venue_id}</Text>
              <Text mt={4}>Starred: {event.is_starred ? "Yes" : "No"}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Index;