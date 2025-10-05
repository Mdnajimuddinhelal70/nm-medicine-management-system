import { motion } from "framer-motion";
import fishImg from '../../assets/mBanner/kalam.jpg'
import { Link } from "react-router-dom";

const Banner = () => {
   return (
      <motion.div
         initial={{ opacity: 0, y: -50 }}  
         animate={{ opacity: 1, y: 0 }} 
         transition={{ duration: 1, ease: "easeOut" }} 
         className="banner"
         style={{ 
            textAlign: 'center', 
            padding: '100px 20px', 
            backgroundColor: '#f5f5f5', 
            position: 'relative', 
            overflow: 'hidden',
            height: '100vh' 
         }}
      >
         <motion.img
            src={fishImg} 
            animate={{ scale: 1.1 }} 
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }} 
            alt="banner background"
            style={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               objectFit: 'cover',  
               zIndex: -1  
            }}
         />
         <motion.h1
            animate={{ x: [-100, 0], opacity: [0, 1] }}  
            transition={{ duration: 2 }}
            style={{ color: "#fff", fontSize: "3rem", fontWeight: "bold" }}
         >
            Quality Medicines, Delivered to You
         </motion.h1>

         <motion.p
            animate={{ opacity: [0, 1], y: [20, 0] }} 
            transition={{ delay: 1, duration: 1.5 }}
            style={{ color: "#fff", fontSize: "1.5rem", marginTop: "20px" }}
         >
            Ensuring the best healthcare with trusted medicines, always at your service.
         </motion.p>
         
         <motion.button
            animate={{ scale: [0.8, 1], opacity: [0, 1] }}
            transition={{ delay: 1.5, duration: 1 }}
            style={{ 
               marginTop: "30px", 
               padding: "10px 20px", 
               fontSize: "1rem", 
               backgroundColor: "#00bfa5", 
               color: "#fff", 
               border: "none", 
               borderRadius: "5px",
               cursor: "pointer"
            }}
            whileHover={{ scale: 1.1 }}  
         >
            <Link to="/">
            Explore Medicines
            </Link>
         </motion.button>
      </motion.div>
   );
};

export default Banner;
