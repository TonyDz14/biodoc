import React, { useState, useEffect } from "react";
import { Box, Button, Heading, VStack, Grid, GridItem, Icon, Text } from "@chakra-ui/react";
import { FaFilePdf, FaEye, FaEyeSlash } from "react-icons/fa";  // Importamos los íconos de ojo
import { motion } from "framer-motion";

// Detectar si el dispositivo es móvil
const isMobile = () => window.innerWidth <= 768;

const MotionButton = motion(Button);

const certificados = [
  { name: "CERTIFICADO ORGÁNICO AZÚCAR DE COCO", url: "/CERTIFICADO-ORGÁNICO-AZÚCAR-COCO.pdf" },
  { name: "CERTIFICADO CERES", url: "/Bioselva-Essentials-CERES.pdf" },
  { name: "CERTIFICADO ORGÁNICO", url: "/Cert-ORGÁNICO.pdf" },
  { name: "CERTIFICADO ORGÁNICO INTERNACIONAL", url: "/Bioselva-Essentials_Cert.pdf" },
  { name: "CERTIFICADO DE CALIDAD ACEITE DE COCO", url: "/CERTIFICADO-CALIDAD-ACEITE-COCO.pdf" }
];

export default function Certificados() {
  const [selectedCertificado, setSelectedCertificado] = useState(null);
  const [showCertificados, setShowCertificados] = useState(false);
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
      

      {/* Botón para mostrar/ocultar certificados */}
      <MotionButton
        w="full"
        size="lg"
        colorScheme="blue"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowCertificados(!showCertificados)}
        leftIcon={showCertificados ? <FaEyeSlash /> : <FaEye />} // Cambio del ícono de ojo
      >
        {showCertificados ? "Ocultar Certificados" : "Ver Certificados"}
      </MotionButton>

      {/* Tarjetas con los certificados */}
      {showCertificados && (
        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4} w="full">
          {certificados.map((certificado, index) => (
            <GridItem
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              boxShadow="md"
              textAlign="center"
              w="full"
            >
              <Icon as={FaFilePdf} boxSize={10} color="red.500" mb={2} />
              <Text fontSize="md" fontWeight="bold" mb={2}>
                {certificado.name}
              </Text>

              {/* Lógica para móvil y escritorio */}
              {isMobileDevice ? (
                <Button
                  colorScheme="blue"
                  size="sm"
                  mt={2}
                  onClick={() => window.open(certificado.url, "_blank")}
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
                    onClick={() => setSelectedCertificado(certificado.url)}
                  >
                    Ver PDF
                  </Button>

                  {/* Vista previa del PDF en pantallas grandes */}
                  {selectedCertificado === certificado.url && (
                    <Box w="full" mt={4} h="400px" overflow="hidden" border="1px solid gray" position="relative">
                      <iframe
                        src={certificado.url}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        title={certificado.name}
                      />
                      {/* Botón para cerrar la vista previa */}
                      <Button
                        colorScheme="red"
                        size="sm"
                        mt={2}
                        onClick={() => setSelectedCertificado(null)} // Esto cierra la vista previa
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
