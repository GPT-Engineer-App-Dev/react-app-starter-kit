import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, VStack, SimpleGrid, FormControl, FormLabel, Input, Button, Container } from '@chakra-ui/react';
import { useEvent, useComments, useAddComment } from '../integrations/supabase/index.js';

const EventDetail = () => {
  const { id } = useParams();
  const { data: event, error: eventError, isLoading: eventLoading } = useEvent(id);
  const { data: comments, error: commentsError, isLoading: commentsLoading } = useComments(id);
  const addComment = useAddComment();
  const [newComment, setNewComment] = useState('');

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await addComment.mutateAsync({ content: newComment, event_id: id });
      setNewComment('');
    }
  };

  if (eventLoading || commentsLoading) {
    return <Text>Loading...</Text>;
  }

  if (eventError || commentsError) {
    return <Text>Error loading data: {eventError?.message || commentsError?.message}</Text>;
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading fontSize="xl">{event.name}</Heading>
          <Text mt={4}>Date: {new Date(event.date).toLocaleDateString()}</Text>
          <Text mt={4}>Venue ID: {event.venue_id}</Text>
          <Text mt={4}>Starred: {event.is_starred ? "Yes" : "No"}</Text>
        </Box>

        <Box mt={10}>
          <Heading as="h2" size="lg" mb={4}>Comments</Heading>
          <SimpleGrid columns={{ base: 1 }} spacing={4}>
            {comments.map(comment => (
              <Box key={comment.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
                <Text>{comment.content}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <Box mt={10}>
          <Heading as="h2" size="lg" mb={4}>Add a Comment</Heading>
          <FormControl>
            <FormLabel>Comment</FormLabel>
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here"
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" onClick={handleAddComment}>
            Submit
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default EventDetail;