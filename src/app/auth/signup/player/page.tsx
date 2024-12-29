'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormItem, FormMessage } from '@/components/ui/form';
import { FormControl, FormField, FormLabel } from '@/components/ui/form';
import { Form } from "@/components/ui/form";
import { Eye, EyeOff } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { AGES, COUNTRIES, TIMEZONES } from '@/static/sample-data';
import { AuthActions } from '@/lib/actions/auth.actions';
import { PlayerProfile } from '@/lib/types';
import { AxiosError } from 'axios';
import { useToast } from '@/hooks/use-toast';


// Define the schema for each page
const accountDetailsSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

const personalInfoSchema = z.object({
  ageGroup: z.enum(['age_under_10', 'age_10_14', 'age_15_18', 'age_over_18'], {
    required_error: "Age group is required"
  }),
  country: z.string({
    required_error: "Country is required"
  }),
  timezone: z.string({
    required_error: "Timezone is required"
  }),
});

const chessBackgroundSchema = z.object({
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced', 'master'], {
    required_error: "Skill level is required"
  }),
  playStyle: z.enum(['defensive', 'aggressive', 'balanced'], {
    required_error: "Play style is required"
  }),
  learningGoals: z.array(
    z.enum(['openings', 'endgame', 'puzzles', 'tournament'])
  ).min(1, "Select at least one learning goal"),
  chessPlaftorms: z.array(z.string()).optional(),
  otherPlatform: z.string().optional(),
});

const TOTAL_STEPS = 3;

export default function SignupPlayerPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [progress, setProgress] = useState(0);

  const { toast } = useToast();

  // Initialize forms first
  const accountForm = useForm({
    resolver: zodResolver(accountDetailsSchema),
  });

  const personalForm = useForm({
    resolver: zodResolver(personalInfoSchema),
  });

  const chessForm = useForm({
    resolver: zodResolver(chessBackgroundSchema),
  });

  // Then define the progress calculation
  const calculateStepProgress = () => {
    const forms = {
      1: accountForm,
      2: personalForm,
      3: chessForm
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
  
  personalForm.watch(() => {
    if (currentStep === 2) {
      const newProgress = calculateStepProgress();
      setProgress(newProgress);
    }
  });
  
  chessForm.watch(() => {
    if (currentStep === 3) {
      const newProgress = calculateStepProgress();
      setProgress(newProgress);
    }
  });

  const handleSubmit = async () => {
    if (currentStep === 1) {
      // Validate and move to next step
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate and move to next step
      setCurrentStep(3);
    } else {
      // Submit all data
      const formData = {
        ...accountForm.getValues(),
        ...personalForm.getValues(),
        ...chessForm.getValues(),
      };
      // Handle form submission
      console.log(formData);
      AuthActions.register({
        role: 'player',
        data: formData as PlayerProfile
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
                  disabled={!accountForm.formState.isValid}
                >
                  Next
                </Button>
              </div>
            </form>
          </Form>
        )}

        {currentStep === 2 && (
          <Form {...personalForm}>
            <form onSubmit={personalForm.handleSubmit(() => handleSubmit())} className='flex flex-col gap-5'>
              <FormField
                control={personalForm.control}
                name="ageGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age Group</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col md:flex-row md:items-center gap-5"
                      >
                        {AGES.map((age) => (
                          <div className="flex items-center space-x-2" key={age.value}>
                            <RadioGroupItem value={age.value} id={age.value} />
                            <Label htmlFor={age.value}>{age.name}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      This helps us provide age-appropriate content and matches.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalForm.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent className="">
                          {COUNTRIES.map((country: { name: string; value: string }) => ( 
                            <SelectItem key={country.value} value={country.value}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      Select your country to help us match you with players in your region.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalForm.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timezone</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIMEZONES.map((timezone: { name: string; value: string }) => ( 
                            <SelectItem key={timezone.name} value={timezone.value}>
                              {timezone.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      Your timezone helps us schedule matches at convenient times.
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
                  disabled={!personalForm.formState.isValid}
                >
                  Next
                </Button>
              </div>
            </form>
          </Form>
        )}

        {currentStep === 3 && (
          <Form {...chessForm}>
            <form onSubmit={chessForm.handleSubmit(() => handleSubmit())} className='flex flex-col gap-5'>
              <FormField
                control={chessForm.control}
                name="skillLevel"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-1">
                      <FormLabel>Skill Level</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Choose the level that best describes your current chess abilities.
                      </p>
                    </div>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col md:flex-row md:items-center gap-5"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="beginner" id="beginner" />
                          <Label htmlFor="beginner">Beginner</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="intermediate" id="intermediate" />
                          <Label htmlFor="intermediate">Intermediate</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="advanced" id="advanced" />
                          <Label htmlFor="advanced">Advanced</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="master" id="master" />
                          <Label htmlFor="master">Master</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={chessForm.control}
                name="playStyle"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-1">
                      <FormLabel>Play Style</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Select the playing style that best matches your approach to chess.
                      </p>
                    </div>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col md:flex-row md:items-center gap-5"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="defensive" id="defensive" />
                          <Label htmlFor="defensive">Defensive</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="aggressive" id="aggressive" />
                          <Label htmlFor="aggressive">Aggressive</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="balanced" id="balanced" />
                          <Label htmlFor="balanced">Balanced</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={chessForm.control}
                name="learningGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Learning Goals</FormLabel>
                    <div className="flex flex-col md:flex-row md:items-center gap-5">
                      {['openings', 'endgame', 'puzzles', 'tournament'].map((goal) => (
                        <div key={goal} className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value?.includes(goal)}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || [];
                              if (checked) {
                                field.onChange([...currentValue, goal]);
                              } else {
                                field.onChange(currentValue.filter((value: string) => value !== goal));
                              }
                            }}
                          />
                          <Label className="capitalize">{goal}</Label>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Choose the areas you&apos;d like to focus on improving in your chess journey.
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
                  disabled={!chessForm.formState.isValid}
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