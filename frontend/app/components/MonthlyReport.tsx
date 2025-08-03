'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function MonthlyReport() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      // Create a temporary div to hold the report content
      const reportDiv = document.createElement('div');
      reportDiv.style.width = '800px';
      reportDiv.style.padding = '40px';
      reportDiv.style.backgroundColor = 'white';
      reportDiv.style.fontFamily = 'Arial, sans-serif';
      reportDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1f2937; margin-bottom: 10px;">AI Finance Advisor</h1>
          <h2 style="color: #6b7280; font-size: 18px;">Monthly Financial Report</h2>
          <p style="color: #9ca3af;">Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Financial Summary</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
              <h4 style="color: #dc2626; margin-bottom: 5px;">Total Spent</h4>
              <p style="font-size: 24px; font-weight: bold; color: #1f2937;">$3,245.67</p>
            </div>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
              <h4 style="color: #16a34a; margin-bottom: 5px;">Total Income</h4>
              <p style="font-size: 24px; font-weight: bold; color: #1f2937;">$5,200.00</p>
            </div>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
              <h4 style="color: #2563eb; margin-bottom: 5px;">Savings Rate</h4>
              <p style="font-size: 24px; font-weight: bold; color: #1f2937;">37.6%</p>
            </div>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
              <h4 style="color: #d97706; margin-bottom: 5px;">Top Category</h4>
              <p style="font-size: 18px; font-weight: bold; color: #1f2937;">Food & Dining</p>
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">AI Insights</h3>
          <div style="margin-top: 20px;">
            <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin-bottom: 15px; border-radius: 4px;">
              <h4 style="color: #dc2626; margin-bottom: 5px;">High Priority: Increase Your Savings</h4>
              <p style="color: #6b7280; margin: 0;">You can save an additional $500/month by reducing dining out expenses by 30%.</p>
            </div>
            <div style="background: #fffbeb; border-left: 4px solid #d97706; padding: 15px; margin-bottom: 15px; border-radius: 4px;">
              <h4 style="color: #d97706; margin-bottom: 5px;">Medium Priority: Monitor Subscription Costs</h4>
              <p style="color: #6b7280; margin: 0;">You have $120/month in recurring subscriptions. Consider canceling unused services.</p>
            </div>
            <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 15px; margin-bottom: 15px; border-radius: 4px;">
              <h4 style="color: #16a34a; margin-bottom: 5px;">Low Priority: Investment Opportunity</h4>
              <p style="color: #6b7280; margin: 0;">With your current savings rate, you could invest $300/month in a diversified portfolio.</p>
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Spending by Category</h3>
          <div style="margin-top: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="font-weight: bold;">Food & Dining</span>
              <span style="color: #dc2626;">$1,245.67</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="font-weight: bold;">Transportation</span>
              <span style="color: #dc2626;">$567.89</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="font-weight: bold;">Shopping</span>
              <span style="color: #dc2626;">$432.10</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="font-weight: bold;">Entertainment</span>
              <span style="color: #dc2626;">$298.45</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0;">
              <span style="font-weight: bold;">Other</span>
              <span style="color: #dc2626;">$701.56</span>
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px;">This report was generated by AI Finance Advisor</p>
          <p style="color: #9ca3af; font-size: 10px;">For personalized financial advice, consult with a certified financial advisor</p>
        </div>
      `;

      document.body.appendChild(reportDiv);

      // Convert to canvas and then to PDF
      const canvas = await html2canvas(reportDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download the PDF
      pdf.save(`financial-report-${new Date().toISOString().split('T')[0]}.pdf`);

      // Clean up
      document.body.removeChild(reportDiv);
      
      toast.success('Monthly report downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF report');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="btn-primary flex items-center"
    >
      {isGenerating ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Generating...
        </>
      ) : (
        <>
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </>
      )}
    </button>
  );
} 