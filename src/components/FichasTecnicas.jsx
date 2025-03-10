import React, { useState, useEffect } from "react";
import { Box, Button, Heading, VStack, Text, Grid, GridItem, Icon } from "@chakra-ui/react";
import { FaEye, FaEyeSlash, FaFilePdf } from "react-icons/fa";  // Agregamos los íconos de ojo
import { motion } from "framer-motion";

// Detectar si el dispositivo es móvil
const isMobile = () => window.innerWidth <= 768;

const MotionButton = motion(Button);

const fichasTecnicas = [
  { name: "ACEITE COCO ORGANICO", url: "/ACEITE-COCO-ORGANICO.pdf" },
  { name: "ACEITE DE OLIVA VIRGEN", url: "/ACEITE-DE-OLIVA-EXTRA-VIRGEN.pdf" },
  { name: "CAFÉ ESPECIALIDAD", url: "/CAFE-ESPECIALIDADA.pdf" },
  { name: "COCO RALLADO", url: "/COCO-RALLADO.pdf" },
  { name: "HARINA DE COCO", url: "/HARINA-COCO.pdf" },
  { name: "SAL ROSADA EXTRA FINA", url: "/SAL-ROSADA-EXTRA-FINA.pdf" },
  { name: "SAL ROSADA PARRILLERA", url: "/SAL-ROSADA-PARRILLERA.pdf" }
];

export default function FichasTecnicas() {
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [showFichas, setShowFichas] = useState(false);
  const [isMobileDevice, setIsMobile] = useState(isMobile());

  useEffect(() => {
    // Actualiza si es un dispositivo móvil cuando se cambia el tamaño de la pantalla
    const handleResize = () => {
      setIsMobile(isMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <VStack spacing={4} w="full">
      

      <MotionButton
        w="full"
        size="lg"
        colorScheme="red"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowFichas(!showFichas)}
        leftIcon={showFichas ? <FaEyeSlash /> : <FaEye />} // Cambio del ícono de ojo
      >
        {showFichas ? "Ocultar Fichas Técnicas" : "Ver Fichas Técnicas"}
      </MotionButton>

      {showFichas && (
        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4} w="full">
          {fichasTecnicas.map((ficha, index) => (
            <GridItem key={index} borderWidth="1px" borderRadius="lg" p={4} boxShadow="md" textAlign="center">
              <Icon as={FaFilePdf} boxSize={10} color="red.500" mb={2} />
              <Text fontSize="md" fontWeight="bold" mb={2}>
                {ficha.name}
              </Text>

              {/* Si el dispositivo es móvil, abrir el PDF en una nueva pestaña */}
              {isMobileDevice ? (
                <Button
                  colorScheme="blue"
                  size="sm"
                  mt={2}
                  onClick={() => window.open(ficha.url, "_blank")}
                >
                  Ver PDF
                </Button>
              ) : (
                <>
                  {/* En pantallas grandes, mostrar una vista previa del PDF */}
                  <Button
                    colorScheme="blue"
                    size="sm"
                    mt={2}
                    onClick={() => setSelectedFicha(ficha.url)}
                  >
                    Ver PDF
                  </Button>

                  {/* Vista previa del PDF en pantallas grandes */}
                  {selectedFicha === ficha.url && (
                    <Box w="full" mt={4} h="400px" overflow="hidden" border="1px solid gray" position="relative">
                      <iframe
                        src={ficha.url}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        title={ficha.name}
                      />
                      {/* Botón para cerrar la vista previa */}
                      <Button
                        colorScheme="red"
                        size="sm"
                        mt={2}
                        onClick={() => setSelectedFicha(null)} // Esto cierra la vista previa
                        position="absolute"
                        top="10px"
                        right="10px"
                      >
                        Cerrar
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </GridItem>
          ))}
        </Grid>
      )}
    </VStack>
  );
}
