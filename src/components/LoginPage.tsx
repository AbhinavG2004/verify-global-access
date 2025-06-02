
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, ArrowLeft, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type VerificationStep = 'choose' | 'email-input' | 'email-verify' | 'phone-input' | 'phone-verify' | 'success';

const LoginPage = () => {
  const [step, setStep] = useState<VerificationStep>('choose');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
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

  const handleEmailSubmit = async () => {
    if (!email) {
      toast({ title: "Please enter your email address", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('email-verify');
      toast({ title: "Verification code sent to your email!" });
    }, 1500);
  };

  const handlePhoneSubmit = async () => {
    if (!phone) {
      toast({ title: "Please enter your phone number", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('phone-verify');
      toast({ title: "OTP sent to your phone!" });
    }, 1500);
  };

  const handleEmailVerification = async () => {
    if (emailCode.length !== 6) {
      toast({ title: "Please enter the 6-digit verification code", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    // Simulate verification
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
    // Simulate verification
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
    if (step === 'email-input' || step === 'phone-input') {
      setStep('choose');
    } else if (step === 'email-verify') {
      setStep('email-input');
    } else if (step === 'phone-verify') {
      setStep('phone-input');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center space-y-2">
          {step !== 'choose' && step !== 'success' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="absolute left-4 top-4 p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {step === 'success' ? <Check className="h-8 w-8" /> : 'NG'}
          </div>
          
          <CardTitle className="text-2xl font-bold text-gray-900">
            {step === 'success' ? 'Welcome!' : 'NoteGenius'}
          </CardTitle>
          
          <CardDescription className="text-gray-600">
            {step === 'choose' && 'Choose your verification method'}
            {step === 'email-input' && 'Enter your email address'}
            {step === 'email-verify' && 'Check your email for verification code'}
            {step === 'phone-input' && 'Enter your phone number'}
            {step === 'phone-verify' && 'Enter the OTP sent to your phone'}
            {step === 'success' && 'Account verified successfully!'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 'choose' && (
            <div className="space-y-4">
              <Button
                onClick={() => setStep('email-input')}
                className="w-full h-14 text-left justify-start bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
                variant="outline"
              >
                <Mail className="h-5 w-5 mr-3" />
                <div>
                  <div className="font-medium">Verify with Email</div>
                  <div className="text-sm text-blue-600">Get a 6-digit code via email</div>
                </div>
              </Button>
              
              <Button
                onClick={() => setStep('phone-input')}
                className="w-full h-14 text-left justify-start bg-green-50 hover:bg-green-100 text-green-700 border border-green-200"
                variant="outline"
              >
                <Phone className="h-5 w-5 mr-3" />
                <div>
                  <div className="font-medium">Verify with Phone</div>
                  <div className="text-sm text-green-600">Get a 4-digit OTP via SMS</div>
                </div>
              </Button>
            </div>
          )}

          {step === 'email-input' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>
              <Button
                onClick={handleEmailSubmit}
                disabled={isLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Sending...' : 'Send Verification Code'}
              </Button>
            </div>
          )}

          {step === 'email-verify' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="h-12 text-center text-lg tracking-widest"
                  maxLength={6}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Code sent to {email}
                </p>
              </div>
              <Button
                onClick={handleEmailVerification}
                disabled={isLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Verifying...' : 'Verify Email'}
              </Button>
              <Button
                onClick={handleEmailSubmit}
                variant="outline"
                className="w-full"
              >
                Resend Code
              </Button>
            </div>
          )}

          {step === 'phone-input' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-32 h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 h-12"
                  />
                </div>
              </div>
              <Button
                onClick={handlePhoneSubmit}
                disabled={isLoading}
                className="w-full h-12 bg-green-600 hover:bg-green-700"
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Button>
            </div>
          )}

          {step === 'phone-verify' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification OTP
                </label>
                <Input
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="h-12 text-center text-lg tracking-widest"
                  maxLength={4}
                />
                <p className="text-sm text-gray-500 mt-2">
                  OTP sent to {countryCode} {phone}
                </p>
              </div>
              <Button
                onClick={handlePhoneVerification}
                disabled={isLoading}
                className="w-full h-12 bg-green-600 hover:bg-green-700"
              >
                {isLoading ? 'Verifying...' : 'Verify Phone'}
              </Button>
              <Button
                onClick={handlePhoneSubmit}
                variant="outline"
                className="w-full"
              >
                Resend OTP
              </Button>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="text-green-600 text-lg font-medium">
                Verification Complete!
              </div>
              <p className="text-gray-600">
                You can now access your NoteGenius account
              </p>
              <Button
                onClick={() => {
                  // Navigate to main app
                  toast({ title: "Redirecting to your dashboard..." });
                }}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Continue to Dashboard
              </Button>
            </div>
          )}

          {(step === 'email-verify' || step === 'phone-verify') && (
            <div className="text-center text-sm text-gray-500">
              {step === 'email-verify' && "Use code: 123456 for demo"}
              {step === 'phone-verify' && "Use OTP: 1234 for demo"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
