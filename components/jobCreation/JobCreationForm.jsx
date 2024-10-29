'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Paper,
  styled,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import { green } from '@mui/material/colors';
import { useRouter } from 'next/navigation';

const steps = ['About', 'Hiring Pipeline', 'Access', 'Preview'];


const initialFormData = {
  jobTitle: '',
  department: '',
  overview: '',
  responsibilities: '',
  education: '',
  experience: '',
  jobType: '',
  location: '',
  salaryRange: '',
  benefits: '',
  postingDate: '',
  closingDate: '',
};

const CustomStepIconRoot = styled('div')(
  ({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 24,
    height: 24,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundColor: green[600],
    }),
    ...(ownerState.completed && {
      backgroundColor: green[600],
    }),
  }),
);

function CustomStepIcon(props) {
  const { active, completed, className, icon } = props;

  return (
    <CustomStepIconRoot ownerState={{ active, completed }} className={className}>
      {completed ? <CheckIcon sx={{ fontSize: 18 }} /> : icon}
    </CustomStepIconRoot>
  );
}

export default function CreateJobForm() {
  const [expanded, setExpanded] = useState('panel1');
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const createJob = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error('Failed to create post');
      
      alert('Job Created');
      setFormData(initialFormData);
      router.push('/workforce/jobs');
    } catch (err) {
      alert(`Error: ${err.message}` || 'An Error Occured');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      createJob();
      return;
    }
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const renderAboutStep = () => (
    <Stack spacing={2}>
      <Accordion 
        expanded={expanded === 'panel1'} 
        onChange={handleChange('panel1')}
        sx={{ '&:before': { display: 'none' } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Basic Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Job Title"
              placeholder="Enter job title"
              value={formData.jobTitle}
              onChange={handleInputChange('jobTitle')}
            />
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                label="Department"
                value={formData.department}
                onChange={handleInputChange('department')}
              >
                <MenuItem value="engineering">Engineering</MenuItem>
                <MenuItem value="marketing">Marketing</MenuItem>
                <MenuItem value="sales">Sales</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion 
        expanded={expanded === 'panel2'} 
        onChange={handleChange('panel2')}
        sx={{ '&:before': { display: 'none' } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Job Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={3}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Overview"
              placeholder="Enter job overview"
              value={formData.overview}
              onChange={handleInputChange('overview')}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Responsibilities"
              placeholder="Enter job responsibilities"
              value={formData.responsibilities}
              onChange={handleInputChange('responsibilities')}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion 
        expanded={expanded === 'panel3'} 
        onChange={handleChange('panel3')}
        sx={{ '&:before': { display: 'none' } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Requirements</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Education"
              placeholder="Enter required education"
              value={formData.education}
              onChange={handleInputChange('education')}
            />
            <TextField
              fullWidth
              label="Experience"
              placeholder="Enter required experience"
              value={formData.experience}
              onChange={handleInputChange('experience')}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion 
        expanded={expanded === 'panel4'} 
        onChange={handleChange('panel4')}
        sx={{ '&:before': { display: 'none' } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Job Type and Location</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Job Type</InputLabel>
              <Select
                label="Job Type"
                value={formData.jobType}
                onChange={handleInputChange('jobType')}
              >
                <MenuItem value="full-time">Full Time</MenuItem>
                <MenuItem value="part-time">Part Time</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Location"
              placeholder="Enter job location"
              value={formData.location}
              onChange={handleInputChange('location')}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion 
        expanded={expanded === 'panel5'} 
        onChange={handleChange('panel5')}
        sx={{ '&:before': { display: 'none' } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Salary and Benefits</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Salary Range"
              placeholder="Enter salary range"
              value={formData.salaryRange}
              onChange={handleInputChange('salaryRange')}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Benefits"
              placeholder="Enter benefits information"
              value={formData.benefits}
              onChange={handleInputChange('benefits')}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion 
        expanded={expanded === 'panel6'} 
        onChange={handleChange('panel6')}
        sx={{ '&:before': { display: 'none' } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Posting Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={3}>
            <TextField
              type="date"
              fullWidth
              label="Posting Date"
              InputLabelProps={{ shrink: true }}
              value={formData.postingDate}
              onChange={handleInputChange('postingDate')}
            />
            <TextField
              type="date"
              fullWidth
              label="Closing Date"
              InputLabelProps={{ shrink: true }}
              value={formData.closingDate}
              onChange={handleInputChange('closingDate')}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );

  const renderPreview = () => (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h6" gutterBottom>Job Posting Preview</Typography>
        
        <Box>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            {formData.jobTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Department: {formData.department}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>Overview</Typography>
          <Typography variant="body2">{formData.overview}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>Responsibilities</Typography>
          <Typography variant="body2">{formData.responsibilities}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>Requirements</Typography>
          <Typography variant="body2">
            Education: {formData.education}<br />
            Experience: {formData.experience}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>Job Details</Typography>
          <Typography variant="body2">
            Type: {formData.jobType}<br />
            Location: {formData.location}<br />
            Salary Range: {formData.salaryRange}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>Benefits</Typography>
          <Typography variant="body2">{formData.benefits}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>Posting Period</Typography>
          <Typography variant="body2">
            Posted: {formData.postingDate}<br />
            Closing: {formData.closingDate}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderAboutStep();
      case 1:
        return (
          <Typography sx={{ p: 3 }}>
            Hiring Pipeline configuration will be implemented here
          </Typography>
        );
      case 2:
        return (
          <Typography sx={{ p: 3 }}>
            Access management will be implemented here
          </Typography>
        );
      case 3:
        return renderPreview();
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: '50%', margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
        <Typography variant="h5">Create Job</Typography>
        <Box>
          <Button 
            variant="outlined" 
            sx={{ mr: 2, color: green[600], borderColor: green[600] }}
          >
            Save as draft
          </Button>
          <Button 
            variant="contained"
            sx={{ bgcolor: green[600] }}
          >
            Template
          </Button>
        </Box>
      </Box>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {renderStepContent()}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{ color: green[600], borderColor: green[600] }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          sx={{ 
            bgcolor: green[600],
            '&:hover': {
              bgcolor: green[700]
            }
          }}
          disabled={isLoading}
          onClick={handleNext}
        >
          {`Next: ${activeStep < steps.length - 1 ? steps[activeStep + 1] : 'Submit'}`}
        </Button>
      </Box>
    </Box>
  );
}


