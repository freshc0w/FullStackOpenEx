import express from 'express';
import diagnoseService from '../services/diagnoseService';
// need service

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnoseEntries());
});

export default router;
