import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send email, form validation)
    console.log('Form submitted:', { name, email, message });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} sx={{ display:"flex", flexDirection:"column",}} >
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Message"
        multiline
        rows={4}
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
