// src/components/RequestCard.js
import React, { useContext, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { AuthContext } from '../context/AuthContext'; // 1. Import AuthContext
import { db } from '../firebase'; // 2. Import db for Firestore
import { doc, updateDoc } from 'firebase/firestore'; // 3. Import Firestore functions
import { useNavigate } from 'react-router-dom';

function RequestCard({ request }) {
  const { currentUser } = useContext(AuthContext); // 4. Get the current user
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const time = request.createdAt?.toDate().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) || "Not available";

  // 5. Function to handle the "I Can Help" click
  const handleHelp = async () => {
    // Redirect to login if user is not logged in
    if (!currentUser) {
      alert("Please log in to offer help.");
      navigate("/login");
      return;
    }

    // Prevent user from accepting their own request
    if (currentUser.uid === request.requesterId) {
      alert("You cannot accept your own request.");
      return;
    }

    setIsLoading(true);
    const requestRef = doc(db, "helpRequests", request.id);
    try {
      // Update the document in Firestore
      await updateDoc(requestRef, {
        status: 'in-progress',
        volunteerId: currentUser.uid,
        volunteerEmail: currentUser.email
      });
      // You can add a success message here if you want
      // For now, the button disabling is enough feedback
    } catch (error) {
      console.error("Error updating request:", error);
      alert("Failed to accept the request. Please try again.");
    }
    setIsLoading(false);
  };
  
  // 6. Determine if the button should be disabled
  const isButtonDisabled = isLoading || request.status === 'in-progress' || currentUser?.uid === request.requesterId;
  const getButtonText = () => {
    if (request.status === 'in-progress') {
        return "Help Offered";
    }
    if (currentUser?.uid === request.requesterId) {
        return "Your Request";
    }
    return "I Can Help";
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3 }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>{request.description}</Typography>
        <Box display="flex" alignItems="center" my={1} color="text.secondary">
          <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">{request.address}</Typography>
        </Box>
        <Box display="flex" alignItems="center" color="text.secondary">
          <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">Posted: {time}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button 
          variant="contained" 
          color="secondary" 
          size="small"
          onClick={handleHelp}
          disabled={isButtonDisabled} // 7. Use the disabled logic
        >
          {getButtonText()} 
        </Button>
      </CardActions>
    </Card>
  );
}
export default RequestCard;