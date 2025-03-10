// components/FloatingImage.js
import { Box, Button, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Función para el botón flotante con imagen
const FloatingImage = ({ scrollToTop }) => {
  return (
    <Box
      position="fixed"  // Fijamos la imagen en la parte inferior
      bottom="10px"  // Coloca la imagen en la parte inferior
      right="10px"   // Coloca la imagen en la esquina inferior derecha
      zIndex="1"
    >
      <Button
        onClick={scrollToTop}  // Llama a la función para hacer scroll al principio
        borderRadius="full"
        w="120px" // Tamaño más grande del botón flotante
        h="120px" // Tamaño más grande del botón flotante
        bg="transparent"
        boxShadow="lg"
      >
        <Image
          src="/colibri.png"
          alt="Imagen de un colibrí"
          objectFit="contain"
          boxSize="full"
        />
      </Button>
    </Box>
  );
};

export default FloatingImage;
