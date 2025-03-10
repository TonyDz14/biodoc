import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  VStack,
  Text,
  Link,
  Icon,
  useColorMode,
  Image,
  HStack,
  Flex,
  useBreakpointValue,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { FaSun, FaMoon, FaInstagram, FaFacebook } from "react-icons/fa";
import VideoSection from "./components/VideoSection";
import FichasTecnicas from "./components/FichasTecnicas";
import Certificados from "./components/Certificados";
import { motion } from "framer-motion"; // Importar motion de framer-motion
import FloatingImage from "./components/FloatingImage"; // Importar el componente FloatingImage

// Configuración del tema
const theme = extendTheme({
  config: {
    initialColorMode: "dark", // Establecer el modo oscuro como predeterminado
    useSystemColorMode: false, // No usar el color del sistema, siempre forzar el modo que elijas
  },
});

export default function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  // Usar hook para determinar el tamaño de la pantalla
  const isLargeScreen = useBreakpointValue({ base: false, md: false, lg: false, xl: false, "2xl": true });  // Pantallas grandes
  const isSmallScreen = useBreakpointValue({ base: true, sm: true, md: true, lg: false, xl: false });  // Pantallas pequeñas
  const isMediumScreen = useBreakpointValue({ base: false, sm: true, md: true, lg: false, xl: false });  // Pantallas medianas (tabletas)

  // Control de tamaño para la imagen
  const imageSize = useBreakpointValue({
    base: "120px",  // Tamaño grande en móviles y tablets
    lg: "500px",   // Tamaño grande en pantallas grandes (PC)
  });

  // Función para hacer scroll hasta la parte superior de la página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Desplazamiento suave
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <Box position="relative" minH="100vh" bg={colorMode === "dark" ? "gray.900" : "gray.100"}>
        {/* Imagen animada en pantallas de escritorio (mayores a 1500px) */}
        {isLargeScreen && (
          <motion.div
            style={{
              position: "absolute",
              right: "150px",  // Imagen más cerca del centro, ajustando el valor
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 0,
              width: imageSize,  // Redimensiona la imagen según el tamaño de la pantalla
              height: imageSize, // Redimensiona la imagen según el tamaño de la pantalla
            }}
            animate={{ y: [0, -20, 0] }} // Movimiento hacia arriba y abajo
            transition={{
              duration: 2,
              repeat: Infinity, // Repetir el movimiento
              repeatType: "reverse", // Reversa para hacer el movimiento continuo
              ease: "easeInOut", // Suaviza el movimiento
            }}
          >
            <Image
              src="/colibri.png"
              alt="Imagen de un colibrí"
              objectFit="contain"  // Ajusta la imagen para que no se recorte
            />
          </motion.div>
        )}

        {/* Mostrar el componente FloatingImage solo en dispositivos pequeños y medianos */}
        {(isSmallScreen || isMediumScreen) && (
          <FloatingImage scrollToTop={scrollToTop} />
        )}

        {/* Contenido principal */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="100vh"  // Asegura que la altura mínima sea el 100% de la pantalla
          p={4}
          textAlign="center"
        >
          <Container maxW="xl" centerContent>
            {/* Botón para cambiar el color del tema */}
            <Button onClick={toggleColorMode} pos="absolute" top={4} right={4}>
              <Icon as={colorMode === "dark" ? FaSun : FaMoon} />
            </Button>

            {/* Logo con animación */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}  // Iniciar fuera de vista
              animate={{ opacity: 1, y: 0 }}    // Finalizar en la posición normal
              transition={{ duration: 1 }}      // Duración de la animación
            >
              <Image
                borderRadius="full"
                boxSize="120px"
                src="/logo.png"
                alt="Logo"
                mb={4}
              />
            </motion.div>

            {/* Título principal */}
            <Heading as="h1" size="xl" mb={2}>
              FICHAS Y CERTIFICADOS DE BIOSELVA ESSENTIALS
            </Heading>

            {/* Subtítulo */}
            <Text fontSize="lg" color="gray.500" mb={4} textAlign="center">
              Naturaleza en su máxima expresión 🥥 <br />
              Transparencia y calidad en cada producto.
            </Text>

            {/* Secciones adicionales */}
            <VStack spacing={8} w="full">
              <VideoSection />
              <FichasTecnicas />
              <Certificados />
            </VStack>

            {/* Redes sociales */}
            <VStack mt={10} spacing={3}>
              <Text fontSize="md" color="gray.500">
                Síguenos en nuestras redes
              </Text>
              <HStack spacing={6}>
                <motion.div
                  whileHover={{
                    scale: 1.2,  // Aumenta el tamaño al pasar el mouse
                    rotate: 15,  // Ligero giro al pasar el mouse
                    transition: { duration: 0.3 }, // Duración del efecto
                  }}
                >
                  <Link href="https://www.instagram.com/bioselva/?hl=es" isExternal>
                    <Icon as={FaInstagram} boxSize={8} color="pink.400" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{
                    scale: 1.2,  // Aumenta el tamaño al pasar el mouse
                    rotate: 15,  // Ligero giro al pasar el mouse
                    transition: { duration: 0.3 }, // Duración del efecto
                  }}
                >
                  <Link href="https://www.facebook.com/BioselvaPeru/?locale=es_LA" isExternal>
                    <Icon as={FaFacebook} boxSize={8} color="blue.600" />
                  </Link>
                </motion.div>
              </HStack>
            </VStack>
          </Container>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}
