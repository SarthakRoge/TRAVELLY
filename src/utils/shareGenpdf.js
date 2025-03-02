import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Helper function to add text with word wrap
const addWrappedText = (doc, text, x, y, maxWidth, lineHeight) => {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const testWidth = doc.getStringUnitWidth(testLine) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    
    if (testWidth > maxWidth && i > 0) {
      doc.text(line, x, currentY);
      line = words[i] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  
  doc.text(line, x, currentY);
  return currentY;
};

// Helper function to add an image from URL
const addImageFromUrl = async (doc, url, x, y, width, height) => {
  try {
    // Create a temporary image element
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    // Wait for the image to load
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
    
    // Convert the image to canvas
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    // Get the image data as base64
    const imageData = canvas.toDataURL('image/jpeg');
    
    // Add the image to the PDF
    doc.addImage(imageData, 'JPEG', x, y, width, height);
    return true;
  } catch (error) {
    console.error('Error adding image:', error);
    return false;
  }
};

// Main function to generate PDF
export const sharePDF = async (trip, mainPhotoUrl) => {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = margin;
  
  // Add title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(0, 0, 0);
  const title = `Travel Itinerary: ${trip?.userSelection?.location?.label}`;
  doc.text(title, pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;
  
  // Add main image if available
  if (mainPhotoUrl) {
    const imageHeight = 50;
    await addImageFromUrl(doc, mainPhotoUrl, margin, yPos, contentWidth, imageHeight);
    yPos += imageHeight + 10;
  } else {
    yPos += 10; // Skip space even if no image
  }
  
  // Add trip details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Trip Details', margin, yPos);
  yPos += 7;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(`Duration: ${trip.userSelection?.noOfDays} Days`, margin, yPos);
  yPos += 6;
  doc.text(`Budget: ${trip.userSelection?.budget}`, margin, yPos);
  yPos += 6;
  doc.text(`Travelers: ${trip.userSelection?.traveler}`, margin, yPos);
  yPos += 10;
  
  // Add hotels section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Recommended Hotels', margin, yPos);
  yPos += 8;
  
  const tripData = trip.tripData.travelPlan;
  
  // Loop through hotels
  for (let i = 0; i < tripData.hotelOptions.length; i++) {
    const hotel = tripData.hotelOptions[i];
    
    // Check if we need a new page
    if (yPos > pageHeight - 50) {
      doc.addPage();
      yPos = margin;
    }
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`${i + 1}. ${hotel.hotelName}`, margin, yPos);
    yPos += 6;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Address: ${hotel.hotelAddress}`, margin + 5, yPos);
    yPos += 6;
    doc.text(`Price: ${hotel.price}`, margin + 5, yPos);
    yPos += 6;
    doc.text(`Rating: ${hotel.rating}/5`, margin + 5, yPos);
    yPos += 6;
    
    doc.setFontSize(10);
    yPos = addWrappedText(doc, `Description: ${hotel.description}`, margin + 5, yPos, contentWidth - 10, 5) + 10;
  }
  
  // Add daily itinerary section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Daily Itinerary', margin, yPos);
  yPos += 10;
  
  // Loop through days
  for (let i = 0; i < tripData.itinerary.length; i++) {
    const day = tripData.itinerary[i];
    
    // Check if we need a new page
    if (yPos > pageHeight - 40) {
      doc.addPage();
      yPos = margin;
    }
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Day ${day.day}: ${day.theme}`, margin, yPos);
    yPos += 6;
    
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(12);
    doc.text(`Best time to visit: ${day.bestTimeToVisit}`, margin + 5, yPos);
    yPos += 10;
    
    // Loop through places
    for (let j = 0; j < day.places.length; j++) {
      const place = day.places[j];
      
      // Check if we need a new page
      if (yPos > pageHeight - 60) {
        doc.addPage();
        yPos = margin;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(`${j + 1}. ${place.name}`, margin + 5, yPos);
      yPos += 6;
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      
      // Add place details with word wrap
      yPos = addWrappedText(doc, `Details: ${place.details}`, margin + 10, yPos, contentWidth - 20, 5) + 5;
      
      doc.text(`Ticket: ${place.ticketPricing}`, margin + 10, yPos);
      yPos += 5;
      doc.text(`Travel time: ${place.timeToTravel}`, margin + 10, yPos);
      yPos += 10;
      
    }
    
    yPos += 5;
  }
  
  // Add footer
  const footerText = 'Generated by TRAVELLY - Your AI-Powered Travel Companion';
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  // Return the PDF as a blob
  return doc.output('blob');
};