
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, ArrowLeft, Check, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type VerificationStep = 'details' | 'email-verify' | 'phone-verify' | 'success';
type ContactMethod = 'email' | 'phone';

const LoginPage = () => {
  const [step, setStep] = useState<VerificationStep>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [contactMethod, setContactMethod] = useState<ContactMethod>('email');
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const countryCodes = [
    { code: '+1', country: 'US', flag: '🇺🇸' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  ];

  const handleDetailsSubmit = async () => {
    if (!name.trim()) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }
    
    if (contactMethod === 'email' && !email.trim()) {
      toast({ title: "Please enter your email address", variant: "destructive" });
      return;
    }
    
    if (contactMethod === 'phone' && !phone.trim()) {
      toast({ title: "Please enter your phone number", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (contactMethod === 'email') {
        setStep('email-verify');
        toast({ title: "Verification code sent to your email!" });
      } else {
        setStep('phone-verify');
        toast({ title: "OTP sent to your phone!" });
      }
    }, 1500);
  };

  const handleEmailVerification = async () => {
    if (emailCode.length !== 6) {
      toast({ title: "Please enter the 6-digit verification code", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (emailCode === '123456') {
        setStep('success');
        toast({ title: "Email verified successfully!" });
      } else {
        toast({ title: "Invalid verification code", variant: "destructive" });
      }
    }, 1000);
  };

  const handlePhoneVerification = async () => {
    if (phoneCode.length !== 4) {
      toast({ title: "Please enter the 4-digit OTP", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (phoneCode === '1234') {
        setStep('success');
        toast({ title: "Phone verified successfully!" });
      } else {
        toast({ title: "Invalid OTP", variant: "destructive" });
      }
    }, 1000);
  };

  const goBack = () => {
    if (step === 'email-verify' || step === 'phone-verify') {
      setStep('details');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-2xl border-0 bg-white/80 backdrop-blur-xl">
        <CardHeader className="text-center space-y-4 pb-8">
          {step !== 'details' && step !== 'success' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="absolute left-4 top-4 p-2 hover:bg-slate-100 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
            {step === 'success' ? (
              <Check className="h-8 w-8" />
            ) : (
              <div className="text-2xl font-bold">NG</div>
            )}
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              {step === 'success' ? 'Welcome!' : 'NoteGenius'}
            </CardTitle>
            
            <CardDescription className="text-slate-600 text-lg">
              {step === 'details' && 'Create your account to get started'}
              {step === 'email-verify' && 'Check your email for verification code'}
              {step === 'phone-verify' && 'Enter the OTP sent to your phone'}
              {step === 'success' && 'Account verified successfully!'}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          {step === 'details' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium text-slate-700">
                  How would you like to verify your account?
                </Label>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={contactMethod === 'email' ? 'default' : 'outline'}
                    onClick={() => setContactMethod('email')}
                    className={`h-14 flex-col gap-1 ${
                      contactMethod === 'email' 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Mail className="h-5 w-5" />
                    <span className="text-sm">Email</span>
                  </Button>
                  
                  <Button
                    type="button"
                    variant={contactMethod === 'phone' ? 'default' : 'outline'}
                    onClick={() => setContactMethod('phone')}
                    className={`h-14 flex-col gap-1 ${
                      contactMethod === 'phone' 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Phone className="h-5 w-5" />
                    <span className="text-sm">Phone</span>
                  </Button>
                </div>
              </div>

              {contactMethod === 'email' && (
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {contactMethod === 'phone' && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                    Phone Number
                  </Label>
                  <div className="flex gap-3">
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger className="w-28 h-12 border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-slate-200 shadow-lg">
                        {countryCodes.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="pl-10 h-12 border-slate-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleDetailsSubmit}
                disabled={isLoading}
                className={`w-full h-12 text-white font-medium shadow-lg transition-all duration-200 ${
                  contactMethod === 'email' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' 
                    : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                }`}
              >
                {isLoading ? 'Processing...' : 'Continue'}
              </Button>
            </div>
          )}

          {step === 'email-verify' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800">Check your email</h3>
                <p className="text-slate-600">
                  We've sent a 6-digit verification code to<br />
                  <span className="font-medium text-slate-800">{email}</span>
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emailCode" className="text-sm font-medium text-slate-700">
                  Verification Code
                </Label>
                <Input
                  id="emailCode"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="h-12 text-center text-lg tracking-widest font-mono border-slate-200"
                  maxLength={6}
                />
              </div>
              
              <Button
                onClick={handleEmailVerification}
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium"
              >
                {isLoading ? 'Verifying...' : 'Verify Email'}
              </Button>
              
              <Button
                onClick={handleDetailsSubmit}
                variant="outline"
                className="w-full border-slate-200 hover:bg-slate-50"
              >
                Resend Code
              </Button>
              
              <div className="text-center text-sm text-slate-500">
                Demo: Use code <span className="font-mono bg-slate-100 px-2 py-1 rounded">123456</span>
              </div>
            </div>
          )}

          {step === 'phone-verify' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800">Check your phone</h3>
                <p className="text-slate-600">
                  We've sent a 4-digit OTP to<br />
                  <span className="font-medium text-slate-800">{countryCode} {phone}</span>
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneCode" className="text-sm font-medium text-slate-700">
                  Verification OTP
                </Label>
                <Input
                  id="phoneCode"
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="h-12 text-center text-lg tracking-widest font-mono border-slate-200"
                  maxLength={4}
                />
              </div>
              
              <Button
                onClick={handlePhoneVerification}
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium"
              >
                {isLoading ? 'Verifying...' : 'Verify Phone'}
              </Button>
              
              <Button
                onClick={handleDetailsSubmit}
                variant="outline"
                className="w-full border-slate-200 hover:bg-slate-50"
              >
                Resend OTP
              </Button>
              
              <div className="text-center text-sm text-slate-500">
                Demo: Use OTP <span className="font-mono bg-slate-100 px-2 py-1 rounded">1234</span>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-slate-800">
                  Welcome, {name}! 🎉
                </h3>
                <p className="text-slate-600 text-lg">
                  Your account has been verified successfully
                </p>
              </div>
              
              <Button
                onClick={() => {
                  toast({ title: "Redirecting to your dashboard..." });
                }}
                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg"
              >
                Continue to Dashboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
