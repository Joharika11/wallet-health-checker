import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Shield, Activity, Wallet, BarChart3 } from "lucide-react";
import { Button } from "../components/ui/button";
import HealthScoreGauge from "../components/health-score-gauge";
import MetricCard from "../components/metric-card";
import RecommendationList, { Recommendation } from "../components/recommendation-list";

export default function Analysis() {
  const { address } = useParams<{ address: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const isDemoPage = location.pathname === "/analysis/demo";
  
  const demoAddress = "8x5rM4GfSXwV1HvQnBPsKS5CpCWGnGTFHmPqaHk6ogQw";
  
  const walletData = {
    address: isDemoPage ? demoAddress : address,
    score: 68,
    metrics: [
      {
        id: "security",
        name: "Security",
        score: 75,
        icon: <Shield className="h-5 w-5 text-solana-purple" />,
        description: "Your wallet security is good, with some minor improvements possible.",
        details:
          "Your wallet shows good security practices. Consider enabling additional security features like multi-factor authentication and hardware wallet integration for enhanced protection.",
      },
      {
        id: "activity",
        name: "Activity",
        score: 82,
        icon: <Activity className="h-5 w-5 text-solana-green" />,
        description: "Your transaction patterns are healthy and consistent.",
        details:
          "Your transaction patterns show regular, consistent activity without suspicious patterns. Continue maintaining good transaction hygiene by verifying recipients and transaction details before confirming.",
      },
      {
        id: "diversification",
        name: "Diversification",
        score: 45,
        icon: <Wallet className="h-5 w-5 text-solana-blue" />,
        description: "Your asset diversification needs improvement.",
        details:
          "Your portfolio is heavily concentrated in a few assets, which increases risk. Consider diversifying your holdings across different asset types and tokens to reduce exposure to market volatility in any single asset.",
      },
      {
        id: "performance",
        name: "Performance",
        score: 62,
        icon: <BarChart3 className="h-5 w-5 text-solana-purple" />,
        description: "Your wallet performance is above average.",
        details:
          "Your wallet has shown moderate performance compared to market benchmarks. There are opportunities to optimize your portfolio for better returns while maintaining your risk profile.",
      },
    ],
    recommendations: [
      {
        id: "rec1",
        title: "Diversify your token holdings",
        description: "Your portfolio is heavily concentrated in a few tokens.",
        impact: "high",
        details:
          "We recommend diversifying your holdings across at least 5-7 different tokens to reduce risk. Consider allocating no more than 20% of your portfolio to any single asset, and include a mix of established and emerging projects.",
      },
      {
        id: "rec2",
        title: "Enable multi-factor authentication",
        description: "Add an extra layer of security to your wallet.",
        impact: "medium",
        details:
          "Multi-factor authentication adds an additional security layer beyond your password. This can be a hardware key, authenticator app, or biometric verification. This significantly reduces the risk of unauthorized access even if your password is compromised.",
      },
      {
        id: "rec3",
        title: "Review inactive tokens",
        description: "You have several tokens with no recent activity.",
        impact: "low",
        details:
          "We've identified 3 tokens in your wallet that haven't had any activity in over 6 months. Consider reviewing these holdings to determine if they still align with your investment strategy or if they should be exchanged for more active assets.",
      },
    ] as Recommendation[],
  };

  const handleChangeWallet = () => {
    navigate("/");
  };

  return (
    <main className="min-h-screen py-6 sm:py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-4 glow-text">
          {isDemoPage ? "Demo Analysis" : "Wallet Health Analysis"}
        </h1>
        
        <div className="bg-[#1A1A2E] p-3 rounded-lg mb-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#B4B4D9]">Address</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleChangeWallet}
                className="text-solana-purple text-xs hover:text-white"
              >
                Change Wallet
              </Button>
            </div>
            <div className="font-mono text-xs text-white break-all">
              {walletData.address}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <HealthScoreGauge score={walletData.score} />
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-white mb-8 glow-text">Metrics Breakdown</h2>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {walletData.metrics.map((metric) => (
            <MetricCard
              key={metric.id}
              icon={metric.icon}
              name={metric.name}
              score={metric.score}
              description={metric.description}
              details={metric.details}
            />
          ))}
        </div>
      </div>

      <div className="mb-16">
        <RecommendationList recommendations={walletData.recommendations} />
      </div>
    </main>
  );
}
