import {
  Button,
  Card,
  Typography,
  useMediaQuery,
  Box,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { auth, provider, signInWithPopup } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

export default function WelcomeScreen({ setUser }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const name = result.user.displayName;
      setUser({ name });
      navigate("/assessment");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "1rem",
      }}
      sx={{
        position: "relative"
      }}
    >
      {/* BioCan Logo */}
      <Box
        component="img"
        src="/images/BioCan.png"
        alt="BioCan Logo"
        sx={{
          mb: { xs: 8, sm: 10, md: 19 },
          marginTop:"121px",
          width: { xs: "140px", sm: "180px", md: "169px" },
          height:"60px",
        }}
      />

      {/* Robot Image */}
      <Box
        component="img"
        src="/images/robot.png"
        alt="Robot"
        sx={{
          position: "absolute",
          marginTop:"20%",
          // bottom: isXs ? "11%" : isSm ? "5%" : isMd ? "-16%" : "0%",
          
          width: {
            xs: "160px",
            sm: "200px",
            md: "260px",
            lg: "320px",
            xl: "400px",
          },
          zIndex: 0,
        }}
      />

      {/* Welcome Card */}
      <Card
        sx={{
          zIndex: 1,
          px: { xs: 2, sm: 3 },
          pt: { xs: 5, sm: 5 },
          pb: { xs: 2, sm: 3 },
          top:"289px",
          left:"32px",
          borderRadius: 4,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          width: "296px",
          height: "211px",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(25px)",
          color: "#fff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <Typography
          letterSpacing="2px"
          fontWeight={700}
          fontSize={{ xs: "18px", sm: "20px", md: "22px", lg: "24px" }}
          mb={2}
        >
          WELCOME!
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "white",
            fontFamily: "TT Hoves",
            fontSize: {
              xs: "11px",
              sm: "12px",
              md: "13px",
              lg: "14px",
              xl: "15px",
            },
            lineHeight: 1.3,
            mb: 2,
          }}
        >
          Your Smart AI Guide That Understands and Prepares You At Every Step
        </Typography>

        {/* Google Sign-In */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
              width="15"
            />
          }
          onClick={handleGoogleSignIn}
          sx={{
            mt: 1,
            backgroundColor: "#fff",
            color: "#000",
            fontWeight: 600,
            fontFamily: "Inter",
            textTransform: "none",
            transition: "transform 0.3s ease",
            "&:hover": {
              backgroundColor: "#f0f0f0",
              transform: "scale(1.03)",
            },
          }}
        >
          Continue with Google
        </Button>

       {/* Disclaimer  */}
        <Typography
          variant="caption"
          sx={{
            fontSize: {
              xs: "8px",
              sm: "9px",
              md: "10px",
              lg: "11px",
              xl: "12px",
            },
            color: "gray",
            mt: 2,
            display: "block",
            fontFamily: "TT Hoves",
            lineHeight: 1.2,
          }}
        >
          By continuing, you agree to our terms of service and{" "}
          <span style={{ textDecoration: "underline" }}>privacy policy</span>.
        </Typography>
      </Card>
    </motion.div>
  );
}
