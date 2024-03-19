import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, useToast } from "@chakra-ui/react";

const API_URL = "https://backengine-5zaq.fly.dev";

const Index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Customer created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setName("");
        setEmail("");
        setPhone("");
      } else {
        toast({
          title: "Error",
          description: "Failed to create customer",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <Heading as="h1" mb={6}>
        New Customer Form
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Index;
