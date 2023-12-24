import express from "express";
const router = express.Router();

/* --- Form --- */

router.get("/", async(req, res) => {
    /**
     * 
     */
    try {
        return res.status(200).json({ success: true });
    } catch (e) {
        console.log(`>app/: ${e.message}`);
        res.status(500).json({ success: false, message: 'Something went wrong..' })
        return
    }
});

export const App = router