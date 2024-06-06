import React from 'react';
import { Container, Box, Heading } from '@chakra-ui/react';
import { SupabaseAuthUI } from '../integrations/supabase/auth.jsx';

const Login = () => {
  return (
    <Container centerContent>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" mt={10}>
        <Heading as="h2" size="lg" mb={4}>Login</Heading>
        <SupabaseAuthUI />
      </Box>
    </Container>
  );
};

export default Login;