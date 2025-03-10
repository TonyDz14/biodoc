import { useState } from "react";
import { VStack, Heading, Button, Grid, GridItem, Box, Icon, Text } from "@chakra-ui/react";
import { FaVideo } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

export default function VideoSection() {
  const [showVideos, setShowVideos] = useState(false); // Controlar si mostrar o no los videos
  const [selectedVideo, setSelectedVideo] = useState(null); // Controlar qué video mostrar

  // Array de videos con sus respectivos archivos y miniaturas
  const videos = [
    { name: "Aceite de coco Bioselva", file: "/COCOVI.mp4", thumbnail: "/cap12.PNG" },
    { name: "Café de especialidad", file: "/CAFEVID2.mp4", thumbnail: "/cap14.PNG" },
    { name: "Grano del café", file: "/CAFEVID.mp4", thumbnail: "/cap13.PNG" },
    { name: "Aceite de oliva", file: "/ANDREVID.mp4", thumbnail: "/cap15.PNG" },
  ];

  return (
    <VStack spacing={4} w="full">
      

      {/* Botón para alternar entre ver y ocultar videos */}
      <MotionButton
        w="full"
        size="lg"
        colorScheme="green"
        leftIcon={<Icon as={FaVideo} />}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowVideos(!showVideos)} // Alternar el estado de los videos
      >
        {showVideos ? "Ocultar Videos" : "Ver Videos"}  {/* Cambia el texto según el estado */}
      </MotionButton>

      {/* Si el estado showVideos es true, mostramos las tarjetas de los videos */}
      {showVideos && (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",   // 1 columna en dispositivos pequeños
            sm: "repeat(2, 1fr)",      // 2 columnas para pantallas más grandes
            md: "repeat(2, 1fr)",      // 2 columnas en dispositivos medianos
            lg: "repeat(2, 1fr)",      // 2 columnas en pantallas grandes
          }}
          gap={4}
          w="full"
          px={4} // Añadimos un padding horizontal para dispositivos móviles
        >
          {videos.map((video, index) => (
            <GridItem key={index} borderWidth="1px" borderRadius="lg" p={4} boxShadow="md" textAlign="center">
              <Text fontSize="md" fontWeight="bold" mb={2}>
                {video.name}
              </Text>

              {/* Si el video está seleccionado, mostramos el video; si no, mostramos la vista previa */}
              {selectedVideo === video.name ? (
                <Box
                  w="full"
                  h="300px"
                  border="1px solid gray"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  position="relative"
                >
                  <iframe
                    src={video.file}
                    width="100%"
                    height="100%"
                    title={video.name}
                    style={{ border: "none" }}
                  />
                  {/* Botón para cerrar el video */}
                  <Button
                    colorScheme="red"
                    size="sm"
                    position="absolute"
                    top="10px"
                    right="10px"
                    onClick={() => setSelectedVideo(null)} // Esto cierra el video
                  >
                    Cerrar
                  </Button>
                </Box>
              ) : (
                // Vista previa del video utilizando una imagen estática como miniatura
                <Box
                  onClick={() => setSelectedVideo(video.name)}  // Al hacer clic, se selecciona el video
                  cursor="pointer"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid gray"
                  borderRadius="md"
                  h="200px" // Mantener el tamaño fijo para las tarjetas
                  position="relative"
                >
                  <Box
                    width="100%"
                    height="100%"
                    position="relative"
                    overflow="hidden"
                    borderRadius="md"
                  >
                    <img
                      src={video.thumbnail}  // Usamos la miniatura del video como vista previa
                      alt={`Vista previa de ${video.name}`}
                      width="100%"
                      height="100%"
                      style={{
                        objectFit: "cover", // Asegura que la imagen cubra el área sin deformarse
                      }}
                    />
                  </Box>
                  <Icon
                    as={FaVideo}
                    boxSize={12}
                    color="white"
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                  />
                </Box>
              )}
            </GridItem>
          ))}
        </Grid>
      )}
    </VStack>
  );
}
