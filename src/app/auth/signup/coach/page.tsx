'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormItem, FormMessage } from '@/components/ui/form';
import { FormControl, FormField, FormLabel } from '@/components/ui/form';
import { Form } from "@/components/ui/form";
import { Check, Eye, EyeOff } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomSelect } from '@/app/components/core/custom-select';
import { AuthActions } from '@/lib/actions/auth.actions';
import { CoachProfile } from '@/lib/types';
import { AxiosError } from 'axios';
import { useToast } from '@/hooks/use-toast';
// import { AGES, COUNTRIES, TIMEZONES } from '@/static/sample-data';


// Define the schema for each page
const accountDetailsSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
});

const professionalDetailsSchema = z.object({
  chessTitle: z.enum(['GM', 'IM', 'FM', 'NM', 'None']).optional(),
  experience: z.enum(['experience_under_1', 'experience_1_3', 'experience_3_5', 'experience_over_5'], {
    required_error: "Experience is required"
  }),
  expertise: z.array(
    z.enum(['openings', 'middle_game', 'endgame', 'tournament', 'rapid_blitz'])
  ).min(1, "Select at least one area of expertise"),
});

const availabilitySchema = z.object({
  preferredLevel: z.array(
    z.enum(['beginner', 'intermediate', 'advanced'])
  ).min(1, "Select at least one preferred level"),
  hourlyRate: z.number().min(1, "Hourly rate is required"),
  availability: z.array(z.object({
    day: z.string(),
    timeSlots: z.array(z.string())
  })).min(1, "Select at least one availability slot"),
});

const additionalInfoSchema = z.object({
  certifications: z.array(
    z.string()
      .url('Please enter a valid URL')
      .startsWith('http', 'URL must start with http:// or https://')
  ).optional(),
  introVideo: z.string()
    .url('Please enter a valid URL')
    .startsWith('http', 'URL must start with http:// or https://')
    .optional()
    .or(z.literal('')),
  portfolio: z.array(
    z.string()
      .url('Please enter a valid URL')
      .startsWith('http', 'URL must start with http:// or https://')
  ).optional(),
});

const TOTAL_STEPS = 4;

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = [
  '09:00-10:00', '10:00-11:00', '11:00-12:00',
  '12:00-13:00', '13:00-14:00', '14:00-15:00',
  '15:00-16:00', '16:00-17:00', '17:00-18:00'
];

const CHESS_TITLES = [
  { value: 'GM', label: 'Grandmaster' },
  { value: 'IM', label: 'International Master' },
  { value: 'FM', label: 'FIDE Master' },
  { value: 'NM', label: 'National Master' },
  { value: 'None', label: 'None' }
];

export default function SignupCoachPage() {
  const [currentStep, setCurrentStep] = useState(2);
  const [showPassword, setShowPassword] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string>(DAYS_OF_WEEK[0]);

  const { toast } = useToast();

  // Initialize forms first
  const accountForm = useForm({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      username: ''
    }
  });

  const professionalForm = useForm({
    resolver: zodResolver(professionalDetailsSchema),
    defaultValues: {
      chessTitle: undefined,
      experience: undefined,
      expertise: []
    }
  });

  const availabilityForm = useForm({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      preferredLevel: [],
      hourlyRate: 0,
      availability: []
    }
  });

  const additionalInfoForm = useForm({
    resolver: zodResolver(additionalInfoSchema),
    defaultValues: {
      certifications: [],
      introVideo: '',
      portfolio: []
    }
  });

  // Then define the progress calculation
  const calculateStepProgress = () => {
    const forms = {
      1: accountForm,
      2: professionalForm,
      3: availabilityForm,
      4: additionalInfoForm
    };
    
    const currentForm = forms[currentStep as keyof typeof forms];
    const formValues = currentForm.getValues();
    const totalFields = Object.keys(formValues).length || 1;
    const filledFields = Object.values(formValues).filter(value => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === 'string') {
        return value.trim() !== '';
      }
      return value !== undefined && value !== null;
    }).length;
    
    const baseProgress = ((currentStep - 1) / TOTAL_STEPS) * 100;
    const currentProgress = (filledFields / totalFields) * (100 / TOTAL_STEPS);
    
    return Math.min(baseProgress + currentProgress, 100);
  };

  // Add watchers after forms are initialized
  accountForm.watch(() => {
    if (currentStep === 1) {
      const newProgress = calculateStepProgress();
      setProgress(newProgress);
    }
  });
  
  professionalForm.watch(() => {
    if (currentStep === 2) {
      const newProgress = calculateStepProgress();
      setProgress(newProgress);
    }
  });
  
  availabilityForm.watch(() => {
    if (currentStep === 3) {
      const newProgress = calculateStepProgress();
      setProgress(newProgress);
    }
  });
  
  additionalInfoForm.watch(() => {
    if (currentStep === 4) {
      const newProgress = calculateStepProgress();
      setProgress(newProgress);
    }
  });

  const handleSubmit = async () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    } else {
      const formData = {
        ...accountForm.getValues(),
        ...professionalForm.getValues(),
        ...availabilityForm.getValues(),
        ...additionalInfoForm.getValues(),
      };
      console.log(formData);
      AuthActions.register({
        role: 'coach',
        data: formData as unknown as CoachProfile
      }, 
      () => {},
      (error: AxiosError) => {
        toast({
          title: "Error", 
          description: error.message || "An unexpected error occurred",
          variant: "destructive",
        });
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="mx-auto p-6 flex flex-col gap-5 min-h-screen w-screen items-center justify-center">
      <div className='w-full max-w-2xl flex flex-col gap-5 p-4 rounded-lg'>
        <div className="w-full flex flex-col gap-2">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground text-center">
            Step {currentStep} of {TOTAL_STEPS}
          </p>
        </div>

        {currentStep === 1 && (
          <Form {...accountForm}>
            <form onSubmit={accountForm.handleSubmit(() => handleSubmit())} className='flex flex-col gap-5'>
              <FormField
                control={accountForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" value={field.value || ''} onChange={field.onChange} />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      Enter your full name as it appears on official documents.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={accountForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" value={field.value || ''} onChange={field.onChange} />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      This will be used for account verification and communications.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={accountForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"}
                          value={field.value || ''}
                          onChange={field.onChange}
                          placeholder="********"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between gap-5">
                <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 1} className='w-[150px] max-w-1/2'>
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className='w-[150px] max-w-1/2'
                  disabled={!accountForm.getValues().fullName || !accountForm.getValues().email || !accountForm.getValues().password}
                >
                  Next
                </Button>
              </div>
            </form>
          </Form>
        )}

        {currentStep === 2 && (
          <Form {...professionalForm}>
            <form onSubmit={professionalForm.handleSubmit(() => handleSubmit())} className='flex flex-col gap-5'>
              <FormField
                control={professionalForm.control}
                name="chessTitle"
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2'>
                    <FormLabel>Chess Title</FormLabel>
                    <FormControl>
                      <CustomSelect 
                        options={CHESS_TITLES} 
                        isSearchable={true}
                        placeholder="Select your chess title"
                        onChange={field.onChange}
                        defaultValue={field.value}
                      />

                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      Select your highest achieved chess title. Select &apos;None&apos; if you don&apos;t have an official title.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={professionalForm.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Teaching Experience</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-3"
                      >
                        {[
                          { value: 'experience_under_1', label: 'Less than 1 year' },
                          { value: 'experience_1_3', label: '1-3 years' },
                          { value: 'experience_3_5', label: '3-5 years' },
                          { value: 'experience_over_5', label: 'More than 5 years' }
                        ].map((option) => (
                          <div className="flex items-center space-x-2" key={option.value}>
                            <RadioGroupItem value={option.value} id={option.value} />
                            <Label htmlFor={option.value}>{option.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      Indicate your total experience in teaching chess, including both online and in-person instruction.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={professionalForm.control}
                name="expertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Areas of Expertise</FormLabel>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: 'openings', label: 'Openings' },
                        { value: 'middle_game', label: 'Middle Game' },
                        { value: 'endgame', label: 'Endgame' },
                        { value: 'tournament', label: 'Tournament Preparation' },
                        { value: 'rapid_blitz', label: 'Rapid/Blitz' }
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value?.includes(option.value as never)}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || [];
                              if (checked) {
                                field.onChange([...currentValue, option.value]);
                              } else {
                                field.onChange(currentValue.filter((value: string) => value !== option.value));
                              }
                            }}
                          />
                          <Label>{option.label}</Label>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Select the areas where you specialize in teaching. This helps students find coaches that match their learning needs.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between gap-5">
                <Button type="button" variant="outline" onClick={handleBack} className='w-[150px] max-w-1/2'>
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className='w-[150px] max-w-1/2'
                  disabled={!professionalForm.getValues().experience || !professionalForm.getValues().expertise?.length}
                >
                  Next
                </Button>
              </div>
            </form>
          </Form>
        )}

        {currentStep === 3 && (
          <Form {...availabilityForm}>
            <form onSubmit={availabilityForm.handleSubmit(() => handleSubmit())} className='flex flex-col gap-5'>
              <FormField
                control={availabilityForm.control}
                name="preferredLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Level</FormLabel>
                    <div className="flex flex-col md:flex-row md:items-center gap-5">
                      {['beginner', 'intermediate', 'advanced'].map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value?.includes(level as never)}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || [];
                              if (checked) {
                                field.onChange([...currentValue, level]);
                              } else {
                                field.onChange(currentValue.filter((value: string) => value !== level));
                              }
                            }}
                          />
                          <Label className="capitalize">{level}</Label>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Select the student skill levels you&apos;re most comfortable teaching. You can choose multiple levels.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={availabilityForm.control}
                name="hourlyRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hourly Rate</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        value={field.value || ''} 
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                      />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      Enter your desired hourly rate in USD. Consider your experience level and market rates when setting this.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={availabilityForm.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-4">
                        {DAYS_OF_WEEK.map((day) => {
                          const dayHasSlots = field.value?.some((av: { day: string; timeSlots: string[]; }) => 
                            av.day === day && av.timeSlots.length > 0
                          );
                          return (
                            <Button
                              key={day}
                              type="button"
                              variant={selectedDay === day ? "default" : "outline"}
                              onClick={() => setSelectedDay(day)}
                              className={`min-w-[100px] relative ${dayHasSlots ? 'border-primary' : ''}`}
                            >
                              {day}
                              {dayHasSlots && (
                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center text-[10px]">
                                  <Check className="h-2 w-2 p-[2px]" />
                                </div>
                              )}
                            </Button>
                          );
                        })}
                      </div>

                      <div className="mt-4">
                        <Label>{selectedDay}</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {TIME_SLOTS.map((slot) => (
                            <div key={`${selectedDay}-${slot}`} className="flex items-center space-x-2">
                              <Checkbox
                                checked={field.value?.some((av: { day: string; timeSlots: string[]; }) => 
                                  av.day === selectedDay && av.timeSlots.includes(slot)
                                )}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];
                                  const dayEntry:unknown = currentValue.find((av: { day: string; }) => av.day === selectedDay);
                                  
                                  if (checked) {
                                    if (dayEntry) {
                                      field.onChange(currentValue.map((av: { day: string; timeSlots: string[]; }) => 
                                        av.day === selectedDay 
                                          ? { ...av, timeSlots: [...av.timeSlots, slot] }
                                          : av
                                      ));
                                    } else {
                                      field.onChange([...currentValue, { day: selectedDay, timeSlots: [slot] }]);
                                    }
                                  } else {
                                    if (dayEntry) {
                                      const updatedEntry = {
                                        ...dayEntry,
                                        timeSlots: (dayEntry as { timeSlots: string[] }).timeSlots.filter((ts: string) => ts !== slot)
                                      };
                                      field.onChange(
                                        currentValue
                                          .map((av: { day: string; timeSlots: string[]; }) => 
                                            av.day === selectedDay ? updatedEntry : av
                                          )
                                          .filter((av: { timeSlots: string[]; }) => av.timeSlots.length > 0)
                                      );
                                    }
                                  }
                                }}
                              />
                              <Label className="text-sm">{slot}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <Label>Selected Time Slots:</Label>
                        <div className="mt-2 border rounded-lg">
                          <Table className='w-full p-0 text-xs'>
                            <TableHeader className='p-0'>
                              <TableRow>
                                <TableHead className="w-[100px] py-3 h-auto">Day</TableHead>
                                <TableHead className="py-3 h-auto">Time Slots</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {DAYS_OF_WEEK.map((day) => {
                                const dayEntry = field.value?.find((av: { day: string }) => av.day === day);
                                return (
                                  <TableRow key={day}>
                                    <TableCell className="font-medium py-3">{day}</TableCell>
                                    <TableCell className="py-3">{dayEntry ? (dayEntry as { timeSlots: string[] }).timeSlots.join(', ') : '-'}</TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>
                        <FormMessage />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between gap-5">
                <Button type="button" variant="outline" onClick={handleBack} className='w-[150px] max-w-1/2'>
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className='w-[150px] max-w-1/2'
                  disabled={!availabilityForm.getValues().preferredLevel?.length || 
                           !availabilityForm.getValues().hourlyRate || 
                           !availabilityForm.getValues().availability?.length}
                >
                  Next
                </Button>
              </div>
            </form>
          </Form>
        )}

        {currentStep === 4 && (
          <Form {...additionalInfoForm}>
            <form onSubmit={additionalInfoForm.handleSubmit(() => handleSubmit())} className='flex flex-col gap-5'>
              <FormField
                control={additionalInfoForm.control}
                name="certifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certifications</FormLabel>
                    <p className="text-sm text-muted-foreground mb-3">
                      Add any relevant chess teaching certifications, training programs, or educational qualifications you&apos;ve completed.
                    </p>
                    <div className="flex flex-col gap-2">
                      {(field.value || []).map((cert: string, index: number) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={cert}
                            onChange={(e) => {
                              const newCerts = [...(field.value || [])] as string[];
                              newCerts[index] = e.target.value;
                              field.onChange(newCerts);
                            }}
                            placeholder="https://example.com/certification"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => {
                              const newCerts = (field.value || []).filter((_: never, i: number) => i !== index);
                              field.onChange(newCerts);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          field.onChange([...(field.value || []), '']);
                        }}
                      >
                        Add Certification
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={additionalInfoForm.control}
                name="introVideo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Introduction Video</FormLabel>
                    <FormControl>
                      <Input 
                        value={field.value || ''} 
                        onChange={field.onChange}
                        placeholder="https://youtube.com/your-intro-video" 
                      />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      Provide a link to a short video introducing yourself and your teaching style. This helps students get to know you better.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={additionalInfoForm.control}
                name="portfolio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio Items</FormLabel>
                    <p className="text-sm text-muted-foreground mb-3">
                      Add links to your chess achievements, published content, or other relevant materials that showcase your expertise.
                    </p>
                    <div className="flex flex-col gap-2">
                      {(field.value || []).map((item: string, index: number) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={item}
                            onChange={(e) => {
                              const newItems = [...(field.value || [])] as string[];
                              newItems[index] = e.target.value;
                              field.onChange(newItems);
                            }}
                            placeholder="https://example.com/portfolio-item"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => {
                              const newItems = (field.value || []).filter((_: never, i: number) => i !== index);
                              field.onChange(newItems);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          field.onChange([...(field.value || []), '']);
                        }}
                      >
                        Add Portfolio Item
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between gap-5">
                <Button type="button" variant="outline" onClick={handleBack} className='w-[150px] max-w-1/2'>
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className='w-[150px] max-w-1/2'
                >
                  Complete
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}