import { Router } from "express";

const router = Router();

// Generates a series of random data
router.get("/generate", (req, res) => {
    const size = parseInt(req.query.size as string) || 16; // Size of the data series (standard: 16)
    const frequency = parseFloat(req.query.frequency as string) || 1.0; // Frequency of the sine wave
    const amplitude = parseFloat(req.query.amplitude as string) || 1.0; // Amplitude of the sine wave
    const data: number[] = [];

    for (let i = 0; i < size; i++) {
        const x = i / size; // Normalized x
        const value = amplitude * Math.sin(2 * Math.PI * frequency * x);
        data.push(value);
    }

    res.json({ data });
});

export default router;
