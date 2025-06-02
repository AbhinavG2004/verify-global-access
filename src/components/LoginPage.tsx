
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Mail, Phone, User, ArrowRight, Smartphone, Globe } from 'lucide-react';
import { toast } from 'sonner';

interface VerificationCode {
  [key: string]: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState<VerificationCode>({});
  const [currentStep, setCurrentStep] = useState<'details' | 'verify' | 'success'>('details');
  const [isLoading, setIsLoading] = useState(false);

  const countryCodes = [
    { code: '+1', country: 'US/CA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
  ];

  const handleDetailsSubmit = async () => {
    if (!name) {
      toast.error('Please enter your name.');
      return;
    }

    if (contactMethod === 'email' && !email) {
      toast.error('Please enter your email address.');
      return;
    }

    if (contactMethod === 'phone' && !phoneNumber) {
      toast.error('Please enter your phone number.');
      return;
    }

    setIsLoading(true);

    // Simulate sending verification code
    setTimeout(() => {
      if (contactMethod === 'email') {
        // For email, generate 6-digit code
        const code = {
          '1': '1', '2': '2', '3': '3', '4': '5', '5': '6', '6': '0'
        };
        setVerificationCode(code);
        toast.success(`Verification code sent to ${email}! (Use: 123560)`);
      } else {
        // For phone, generate 4-digit code
        const code = {
          '1': '1', '2': '2', '3': '3', '4': '4'
        };
        setVerificationCode(code);
        toast.success(`OTP sent to ${countryCode}${phoneNumber}! (Use: 1234)`);
      }
      setCurrentStep('verify');
      setIsLoading(false);
    }, 2000);
  };

  const handleVerificationSubmit = () => {
    const enteredCode = Object.values(verificationCode).join('');
    const expectedCode = contactMethod === 'email' ? '123560' : '1234';

    if (enteredCode === expectedCode) {
      handleVerificationSuccess();
    } else {
      toast.error('Invalid verification code. Please try again.');
    }
  };

  const handleVerificationSuccess = () => {
    setCurrentStep('success');
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const renderDetailsStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Welcome to NoteGenius
        </h2>
        <p className="text-gray-500 text-lg">Let's get you started with your account</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">How would you like to verify?</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setContactMethod('email')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                contactMethod === 'email'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <Mail className="w-5 h-5 mx-auto mb-2" />
              <span className="text-sm font-medium">Email</span>
            </button>
            <button
              type="button"
              onClick={() => setContactMethod('phone')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                contactMethod === 'phone'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <Smartphone className="w-5 h-5 mx-auto mb-2" />
              <span className="text-sm font-medium">Phone</span>
            </button>
          </div>
        </div>

        {contactMethod === 'email' ? (
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
            <div className="flex gap-3">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="h-12 px-3 border border-gray-200 rounded-lg bg-white text-base focus:border-blue-500 focus:ring-blue-500/20 focus:outline-none"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 flex-1"
              />
            </div>
          </div>
        )}

        <Button 
          onClick={handleDetailsSubmit} 
          disabled={isLoading} 
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending verification...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Continue
              <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );

  const renderVerificationStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          {contactMethod === 'email' ? (
            <Mail className="w-8 h-8 text-white" />
          ) : (
            <Smartphone className="w-8 h-8 text-white" />
          )}
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Verify Your Account</h2>
        <div className="space-y-1">
          <p className="text-gray-600">
            We've sent a {contactMethod === 'email' ? '6-digit code' : '4-digit OTP'} to
          </p>
          <p className="font-semibold text-gray-900">
            {contactMethod === 'email' ? email : `${countryCode}${phoneNumber}`}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="flex gap-3">
            {Array.from({ length: contactMethod === 'email' ? 6 : 4 }).map((_, index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                value={verificationCode[String(index + 1)] || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 1) {
                    setVerificationCode({ ...verificationCode, [String(index + 1)]: value });
                    
                    // Auto-focus next input
                    if (value && index < (contactMethod === 'email' ? 5 : 3)) {
                      const nextInput = document.querySelector(`input:nth-of-type(${index + 2})`) as HTMLInputElement;
                      nextInput?.focus();
                    }
                  }
                }}
                onKeyDown={(e) => {
                  // Auto-focus previous input on backspace
                  if (e.key === 'Backspace' && !verificationCode[String(index + 1)] && index > 0) {
                    const prevInput = document.querySelector(`input:nth-of-type(${index})`) as HTMLInputElement;
                    prevInput?.focus();
                  }
                }}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            Didn't receive the code?{' '}
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Resend
            </button>
          </p>
        </div>

        <Button 
          onClick={handleVerificationSubmit} 
          className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Verify Account
        </Button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Welcome aboard, {name}!</h2>
          <p className="text-gray-600 text-lg">
            Your account has been verified successfully
          </p>
        </div>
      </div>
      
      <div className="bg-green-50 rounded-xl p-4">
        <p className="text-green-700 font-medium">
          Redirecting to your dashboard...
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 backdrop-blur-sm bg-white/80">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NoteGenius
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
              currentStep === 'details' ? 'bg-blue-100 text-blue-700' : 
              currentStep === 'verify' ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-700'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                currentStep === 'details' ? 'bg-blue-500' : 'bg-green-500'
              }`} />
              Details
            </div>
            <div className="w-8 h-px bg-gray-200" />
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
              currentStep === 'verify' ? 'bg-blue-100 text-blue-700' : 
              currentStep === 'details' ? 'bg-gray-100 text-gray-400' : 'bg-green-100 text-green-700'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                currentStep === 'verify' ? 'bg-blue-500' : 
                currentStep === 'success' ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              Verify
            </div>
            <div className="w-8 h-px bg-gray-200" />
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
              currentStep === 'success' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                currentStep === 'success' ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              Success
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-2">
          {currentStep === 'details' && renderDetailsStep()}
          {currentStep === 'verify' && renderVerificationStep()}
          {currentStep === 'success' && renderSuccessStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
