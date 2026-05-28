import { useState } from "react";
import { ShoppingCart, Star, Download, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import mifixProImage from "../../imports/image.png";
import qualcommToolImage from "../../imports/image-1.png";
import mtkAuthToolImage from "../../imports/mtk-auth-tool.png";
import samFwFrpToolImage from "../../imports/samfw-frp-tool.png";
import universalActivatorImage from "../../imports/universal-activator.png";

interface SourceCodeItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  downloads: number;
  tags: string[];
  image?: string;
  features?: string[];
}

export function BuySourceCode() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<SourceCodeItem | null>(null);

  const sourceCodeItems: SourceCodeItem[] = [
    {
      id: 1,
      name: "Qualcomm Service Tool",
      description: "Premium Qualcomm EDL service tool with advanced flashing capabilities, one-click operations, Mi Fastboot support, and MTP bypass. Supports 725+ devices with auto-loader detection.",
      price: 1000,
      category: "Desktop Application",
      rating: 4.9,
      downloads: 2850,
      tags: ["C#", "Qualcomm", "EDL", "Fastboot"],
      image: qualcommToolImage,
      features: [
        "EDL Flashing (FlashUI.cs) - Auto-detect partition table (eMMC/UFS), flash/read/erase partitions, XML flash file support",
        "AutoLoader Support - Auto-detects appropriate loader for 725+ devices with manual fallback option",
        "Storage Type Detection - Auto-configures for eMMC (512-byte sectors) or UFS (4096-byte sectors)",
        "EDL Unlock & One-Click Operations - Reset Data, Reset FRP, Reset/Disable Mi Cloud, Reset/Read EFS, Read device info",
        "Pre-configured Devices - Support for Xiaomi, Samsung, Oppo, and universal devices",
        "Mi Fastboot Operations - Flash fastboot ROMs (.bat files), get device info, reboot to system/EDL, boot images",
        "MTP Bypass - Universal Media Transfer Protocol bypass to access YouTube, Browser, Settings, File Manager, ADB, Dialer, App Store",
        "Advanced Features - New Qualcomm chipset support, auto-configure USB speed, auto-generate XML commands, built-in Hex editor, ADB Port Diag"
      ]
    },
    {
      id: 2,
      name: "Xiaomi Auth Flashing (Mi Fix Pro)",
      description: "Professional Xiaomi device unlocking and flashing tool with support for Qualcomm and MediaTek chipsets. Includes user authentication, credit system, and automatic updates.",
      price: 2000,
      category: "Desktop Application",
      rating: 4.9,
      downloads: 3200,
      tags: ["C#", "DevExpress", "Qualcomm", "MediaTek"],
      image: mifixProImage,
      features: [
        "User Authentication & Credit System - Login to mifixpro.org server with secure account management",
        "Qualcomm (Snapdragon) Support - Firehose protocol, GPT operations, firmware flashing from rawprogram XML",
        "MediaTek Support - Preloader/DA handling, BROM-mode security bypass, scatter file parsing",
        "Partition Operations - FRP erase, factory reset, Mi Account bypass, EFS/NV backup",
        "Modern UI - DevExpress WinForms controls with TreeList, progress tracking, and color-coded logs",
        "Wide Chipset Coverage - Helio P10-P70, G80-G96, Dimensity 700-9400-Ultra (MT6755-MT6991)",
        "Firmware Management - Read/write partitions, preloader flashing, device reboot capabilities",
        "Automatic Updates - Built-in update checking and downloading system"
      ]
    },
    {
      id: 9,
      name: "MTK Python Auth Tool",
      description: "Premium MediaTek smartphone servicing tool with Python integration. Supports FRP erase, MiCloud reset, firmware flashing, and auth bypass across 10+ major brands including Xiaomi, Samsung, Huawei, and more.",
      price: 700,
      category: "Desktop Application",
      rating: 4.8,
      downloads: 1640,
      tags: ["C#", "Python", "MediaTek", "DevExpress"],
      image: mtkAuthToolImage,
      features: [
        "Supported Brands - Xiaomi, Vivo, Oppo, Realme, Asus, Samsung, Meizu, Huawei, Nokia, Infinix",
        "FRP Erase - Factory Reset Protection removal for supported MTK devices",
        "MiCloud Reset - Bypass and reset Xiaomi MiCloud account lock",
        "Format Data - Full data format with partition wipe support",
        "Read Firmware - Read full firmware from device storage",
        "Flash Firmware - Write firmware via scatter file or preloader",
        "Read RPMB - Read Replay Protected Memory Block data",
        "Universal Unlock/Relock - Bootloader unlock and relock operations",
        "Backup NV Memory - Non-Volatile memory backup for IMEI and calibration data",
        "Auth Bypass - Authentication bypass for secured MTK devices",
        "Read Info (UNIF/BROM) - Device info reading in both UNIF and BROM modes",
        "Scatter File Support - MTK firmware flashing via scatter file format",
        "Preloader Handling - Custom preloader injection and management",
        "DA Support - Download Agent support for MTK communication",
        "Auth File Support - Custom auth file loading for protected devices",
        "Connection Modes - BromUSB and BromUART connection support",
        "Partition Management - Add/select individual partitions for targeted flashing",
        "CPU Type Support - Compatible with eMMC and UFS storage types",
        "Libraries Used - DevExpress UI, SevenZipSharp, Newtonsoft.Json, Python integration, MTK flash libraries"
      ]
    },
    {
      id: 10,
      name: "SamFwFRP Tool",
      description: "Premium Samsung FRP removal and servicing tool. Supports FRP bypass, factory reset, Knox disable, CSC change, and browser unlock via ADB, AT commands, and APK automation. Integrates with samfw.com API.",
      price: 500,
      category: "Desktop Application",
      rating: 4.8,
      downloads: 1920,
      tags: ["C#", "Samsung", "ADB", "AT Commands"],
      image: samFwFrpToolImage,
      features: [
        "New FRP Removal - Enables ADB via AT commands, then pushes and executes frp.bin binary to bypass Factory Reset Protection",
        "Old FRP Removal - Uses ADB commands to modify settings and launch Google login activity for legacy Samsung devices",
        "Enable ADB - Uses AT commands over serial port to enable USB debugging on Samsung devices",
        "CSC Change - Modifies device's Country Specific Code using AT commands and reboots automatically",
        "Factory Reset (APK) - Installs FacRst.apk and automates UI clicks via ADB for a clean factory reset",
        "Factory Reset (AT Command) - Uses AT+FACTORST command for MTP mode factory reset without UI automation",
        "Disable Knox - Uninstalls, clears, and disables ~12 Knox-related system packages via ADB",
        "Open Browser - Installs a temporary driver, uses linux-adk.exe to put device in Accessory mode, opens YouTube/Google Maps/Samsung Browser",
        "Read Device Information - Retrieves model, CSC, version, IMEI, serial number, lock status via AT+DEVCONINFO",
        "Reboot Device - Reboots device using AT+CFUN command",
        "API Integration - Checks for updates from samfw.com and sends job status reports to samfw.com API"
      ]
    },
    {
      id: 11,
      name: "Universal Activator MEID/GSM Full Signal",
      description: "Premium iOS activation bypass tool supporting MEID and GSM models on iOS 12–17. Detects connected devices, displays full device info, and performs iCloud activation lock bypass using SSH, jailbreak tools, and server-side API communication.",
      price: 400,
      category: "Desktop Application",
      rating: 4.7,
      downloads: 1105,
      tags: ["C#", "iOS", "iCloud Bypass", "SSH"],
      image: universalActivatorImage,
      features: [
        "iOS Device Detection - Detects connected devices using Apple's Mobile Device drivers with full info display",
        "Device Info Display - Shows Product Type, iOS Version, UDID, IMEI, Serial Number, and Activation State",
        "Device Image Preview - Displays model image for iPhone 6 through iPhone X",
        "Activation Bypass (MEID) - iCloud activation lock bypass for MEID model iPhones",
        "Activation Bypass (GSM) - iCloud activation lock bypass for GSM model iPhones",
        "iOS 12–14 Support - Full activation bypass support for iOS versions 12 to 14",
        "iOS 15–17 Support - Full activation bypass support for iOS versions 15 to 17",
        "External Tool Integration - Uses ideviceinfo.exe, ideviceactivation.exe, iproxy.exe, curl.exe from lib directory",
        "SSH/SCP Communication - Connects to jailbroken devices via SSH for file manipulation and command execution",
        "Jailbreak Tools - Includes HFZRa1n, Gaster, and WinRa1n for jailbreaking supported devices",
        "Server API Communication - HTTP GET/POST requests to remote activation server for bypass operations",
        "Serial Number Registration - Registers device serial number with the activation server",
        "Security & Process Management - Terminates debuggers and proxy tools (Wireshark, CharlesProxy, Fiddler, etc.)"
      ]
    },
    {
      id: 3,
      name: "E-Commerce Platform",
      description: "Full-featured e-commerce platform with payment integration, product management, and user authentication.",
      price: 299,
      category: "Web Application",
      rating: 4.8,
      downloads: 1250,
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 4,
      name: "Social Media Dashboard",
      description: "Modern social media management dashboard with analytics, scheduling, and multi-platform support.",
      price: 199,
      category: "Dashboard",
      rating: 4.6,
      downloads: 890,
      tags: ["React", "TypeScript", "API"],
    },
    {
      id: 5,
      name: "Mobile Banking App",
      description: "Complete mobile banking application with transaction history, transfers, and security features.",
      price: 399,
      category: "Mobile App",
      rating: 4.9,
      downloads: 2100,
      tags: ["React Native", "Firebase", "Security"],
    },
    {
      id: 6,
      name: "Blog CMS",
      description: "Content management system for blogs with SEO optimization, markdown support, and media library.",
      price: 149,
      category: "CMS",
      rating: 4.5,
      downloads: 1580,
      tags: ["Next.js", "PostgreSQL", "Markdown"],
    },
    {
      id: 7,
      name: "Task Management System",
      description: "Collaborative task management platform with team boards, notifications, and time tracking.",
      price: 249,
      category: "Productivity",
      rating: 4.7,
      downloads: 1320,
      tags: ["Vue.js", "Express", "WebSocket"],
    },
    {
      id: 8,
      name: "Real Estate Portal",
      description: "Property listing platform with advanced search, map integration, and virtual tour features.",
      price: 349,
      category: "Web Application",
      rating: 4.8,
      downloads: 760,
      tags: ["React", "Maps API", "Search"],
    },
  ];

  const filteredItems = sourceCodeItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl mb-4 text-gray-900">Buy Source Code</h1>
        <p className="text-xl text-gray-600 mb-8">
          Browse our collection of premium, ready-to-use source code for your projects.
        </p>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search source code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Source Code Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="flex flex-col overflow-hidden">
            {item.image && (
              <div
                className="w-full h-48 bg-gray-100 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedProduct(item)}
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary">{item.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm">{item.rating}</span>
                </div>
              </div>
              <CardTitle className="text-xl">{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {item.features && item.features.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm mb-2">Key Features:</p>
                  <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                    {item.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx}>{feature.split(' - ')[0]}</li>
                    ))}
                  </ul>
                  {item.features.length > 3 && (
                    <button
                      onClick={() => setSelectedProduct(item)}
                      className="text-xs text-blue-600 mt-2 hover:underline cursor-pointer"
                    >
                      +{item.features.length - 3} more features
                    </button>
                  )}
                </div>
              )}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span>{item.downloads.toLocaleString()} downloads</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div>
                <span className="text-3xl text-gray-900">${item.price}</span>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No source code found matching your search.</p>
        </div>
      )}

      {/* Product Details Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <DialogTitle className="text-2xl mb-2">{selectedProduct.name}</DialogTitle>
                    <DialogDescription className="text-base">
                      {selectedProduct.description}
                    </DialogDescription>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Badge variant="secondary">{selectedProduct.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm">{selectedProduct.rating}</span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {selectedProduct.image && (
                  <div className="w-full rounded-lg overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )}

                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div>
                    <h3 className="text-lg mb-3">Complete Feature List</h3>
                    <ul className="space-y-3">
                      {selectedProduct.features.map((feature, idx) => {
                        const [title, description] = feature.split(' - ');
                        return (
                          <li key={idx} className="flex gap-3">
                            <span className="text-blue-600 mt-1">•</span>
                            <div>
                              <p className="text-gray-900">{title}</p>
                              {description && (
                                <p className="text-sm text-gray-600 mt-1">{description}</p>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <p className="w-full text-sm text-gray-600 mb-1">Technologies:</p>
                  {selectedProduct.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span>{selectedProduct.downloads.toLocaleString()} downloads</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-4xl text-gray-900">${selectedProduct.price}</span>
                  </div>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
