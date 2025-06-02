import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CheckCircle, Mail, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

interface VerificationCode {
  [key: string]: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState<VerificationCode>({});
  const [currentStep, setCurrentStep] = useState<'email' | 'verify' | 'success'>('email');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async () => {
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }

    setIsLoading(true);

    // Simulate sending a verification code
    setTimeout(() => {
      const code = {
        '1': String(Math.floor(Math.random() * 10)),
        '2': String(Math.floor(Math.random() * 10)),
        '3': String(Math.floor(Math.random() * 10)),
        '4': String(Math.floor(Math.random() * 10)),
        '5': String(Math.floor(Math.random() * 10)),
        '6': String(Math.floor(Math.random() * 10)),
      };
      setVerificationCode(code);
      setCurrentStep('verify');
      setIsLoading(false);
      toast.success('Verification code sent to your email!');
    }, 1500);
  };

  const handleVerificationSubmit = () => {
    const enteredCode = Object.values(verificationCode).join('');
    const expectedCode = Object.values(verificationCode).join('');

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

  const renderEmailStep = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
        <Mail className="w-10 h-10 text-blue-600" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Your Email</h2>
        <p className="text-gray-600">
          Please enter the email address associated with your account.
          We will send a verification code to your email.
        </p>
      </div>
      <Input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-sm mx-auto"
      />
      <Button onClick={handleEmailSubmit} disabled={isLoading} className="w-full max-w-sm mx-auto bg-blue-500 text-white">
        {isLoading ? 'Sending...' : 'Send Verification Code'}
      </Button>
    </div>
  );

  const renderVerificationStep = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
        <ShieldCheck className="w-10 h-10 text-yellow-600" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Account</h2>
        <p className="text-gray-600">
          Please enter the verification code we sent to <span className="font-semibold">{email}</span>
        </p>
      </div>
      <div className="flex justify-center space-x-2">
        {Object.keys(verificationCode).map((key) => (
          <Input
            key={key}
            type="number"
            maxLength={1}
            className="w-12 h-12 rounded-md border border-gray-300 text-center text-xl font-bold"
            value={verificationCode[key] || ''}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value) && value.length <= 1) {
                setVerificationCode({ ...verificationCode, [key]: value });
              }
            }}
          />
        ))}
      </div>
      <Button onClick={handleVerificationSubmit} className="w-full max-w-sm mx-auto bg-green-500 text-white">
        Verify Account
      </Button>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome aboard!</h2>
        <p className="text-gray-600">
          Your account has been verified successfully. Redirecting to dashboard...
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md w-full p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center mb-4">
            Welcome to NoteGenius
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 'email' && renderEmailStep()}
          {currentStep === 'verify' && renderVerificationStep()}
          {currentStep === 'success' && renderSuccessStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
