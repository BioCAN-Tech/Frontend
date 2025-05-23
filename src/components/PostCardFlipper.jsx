import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const cardVariants = {
  enterFromRight: {
    rotateY: 90,
    opacity: 0,
  },
  enterFromLeft: {
    rotateY: -90,
    opacity: 0,
  },
  center: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.6 },
  },
  exitToLeft: {
    rotateY: -90,
    opacity: 0,
    transition: { duration: 0.6 },
  },
  exitToRight: {
    rotateY: 90,
    opacity: 0,
    transition: { duration: 0.6 },
  },
};

export default function PostCardFlipper() {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right"); // 'right' or 'left'
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleNext = () => {
    setDirection("right");
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
      setIsVisible(true);
    }, 600);
  };

  const handleBack = () => {
    setDirection("left");
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
      setIsVisible(true);
    }, 300);
  };

  if (posts.length === 0) return <Typography>Loading...</Typography>;

  const post = posts[currentIndex];

  return (
    <div style={{ perspective: "1000px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={post.id}
            initial={direction === "right" ? "enterFromRight" : "enterFromLeft"}
            animate="center"
            exit={direction === "right" ? "exitToLeft" : "exitToRight"}
            variants={cardVariants}
            style={{
              width: 300,
              height: 200,
              marginBottom: 20,
              transformStyle: "preserve-3d",
            }}
          >
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">Post #{post.id}</Typography>
                <Typography variant="subtitle1">{post.title}</Typography>
                <Typography variant="body2">{post.body}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleBack} disabled={currentIndex === 0}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      </Stack>
    </div>
  );
}
