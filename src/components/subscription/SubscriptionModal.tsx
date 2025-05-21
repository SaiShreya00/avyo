
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubscribe: () => void;
}

const SubscriptionModal = ({ open, onOpenChange, onSubscribe }: SubscriptionModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly");
  const { toast } = useToast();

  const handleSubscribe = () => {
    // In a real app, this would integrate with a payment processor like Stripe
    toast({
      title: "Subscription successful!",
      description: `You've subscribed to the ${selectedPlan} plan.`,
    });
    onSubscribe();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Upgrade to Avyo Pro</DialogTitle>
          <DialogDescription className="text-center">
            You've reached the limit of 20 free questions. Upgrade to continue chatting with Avyo.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {/* Monthly Plan */}
          <div 
            className={`border rounded-lg p-4 relative cursor-pointer ${
              selectedPlan === "monthly" ? "border-avyo-primary bg-avyo-primary/5" : ""
            }`}
            onClick={() => setSelectedPlan("monthly")}
          >
            <div className="absolute top-2 right-2">
              {selectedPlan === "monthly" ? (
                <div className="h-6 w-6 rounded-full bg-avyo-primary flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
              ) : (
                <div className="h-6 w-6 rounded-full border border-gray-300"></div>
              )}
            </div>
            <h3 className="font-bold text-lg">Monthly</h3>
            <div className="text-2xl font-bold my-2">$9.99<span className="text-sm font-normal">/month</span></div>
            <ul className="space-y-2 mt-4">
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span>Unlimited conversations</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span>Cancel anytime</span>
              </li>
            </ul>
          </div>

          {/* Annual Plan */}
          <div 
            className={`border rounded-lg p-4 relative cursor-pointer ${
              selectedPlan === "yearly" ? "border-avyo-primary bg-avyo-primary/5" : ""
            }`}
            onClick={() => setSelectedPlan("yearly")}
          >
            <div className="absolute top-2 right-2">
              {selectedPlan === "yearly" ? (
                <div className="h-6 w-6 rounded-full bg-avyo-primary flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
              ) : (
                <div className="h-6 w-6 rounded-full border border-gray-300"></div>
              )}
            </div>
            <div className="absolute top-2 left-2 bg-avyo-accent text-white text-xs px-2 py-1 rounded">SAVE 20%</div>
            <h3 className="font-bold text-lg">Annual</h3>
            <div className="text-2xl font-bold my-2">$95.88<span className="text-sm font-normal">/year</span></div>
            <div className="text-sm text-gray-500">Only $7.99/month</div>
            <ul className="space-y-2 mt-4">
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span>Unlimited conversations</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span>Annual billing</span>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            <X size={16} className="mr-2" />
            Not now
          </Button>
          <Button onClick={handleSubscribe} className="w-full sm:w-auto bg-avyo-primary hover:bg-avyo-secondary">
            <Check size={16} className="mr-2" />
            Subscribe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
