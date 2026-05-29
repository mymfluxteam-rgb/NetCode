import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { ShoppingCart, Star, Download, Search, X, ZoomIn, PlayCircle } from "lucide-react";
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
import qualcommToolImage from "../../imports/qualcomm-service-tool.png";
import qualcommCustomer1Image from "../../imports/qualcomm-customer-1.png";
import qualcommCustomer2Image from "../../imports/qualcomm-customer-2.png";
import mtkAuthToolImage from "../../imports/mtk-auth-tool.png";
import mtkAuthCustomerImage from "../../imports/mtk-auth-customer.png";
import ispProgrammerCustomerImage from "../../imports/isp-programmer-customer.png";
import androidServiceCustomerImage from "../../imports/android-service-customer.png";
import samFwFrpToolImage from "../../imports/samfw-frp-tool.png";
import universalActivatorImage from "../../imports/universal-activator.png";
import ispProgrammerImage from "../../imports/isp-programmer-tool.png";
import xiaomiFireToolImage from "../../imports/xiaomi-fire-tool.png";
import androidSamFrpImage from "../../imports/android-samfrp-tool.png";
import androidServiceToolImage from "../../imports/android-service-tool.png";
import keyGeneratorImage from "../../imports/key-generator.png";
import mymProToolImage from "../../imports/mym-pro-tool.png";
import qualcommToolV1Image from "../../imports/qualcomm-tool-v1.png";
import allInOneBypassImage from "../../imports/all-in-one-bypass-icloud.png";
import fastbootFlasherImage from "../../imports/fastboot-flasher.png";
import noNeedVpnImage from "../../imports/no-need-vpn-bypass.png";
import optimaGramImage from "../../imports/optimagram-premium.png";
import fastbootEraseToolImage from "../../imports/fastboot-erase-tool.png";
import androidToolImage from "../../imports/android-tool.png";
import miflashNoAuthImage from "../../imports/miflash-noauth.png";
import authLoaderXiaomiImage from "../../imports/auth-loader-android-xiaomi.png";
import hwidKeygenImage from "../../imports/hwid-keygen-generator.png";

export interface SourceCodeItem {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  rating: number;
  downloads: number;
  tags: string[];
  image?: string;
  images?: string[];
  features?: string[];
  badge?: "new" | "featured";
  demoVideo?: string;
  githubUrl?: string;
}

export const sourceCodeItems: SourceCodeItem[] = [
    {
      id: 1,
      name: "Qualcomm Service Tool",
      description: "Premium Qualcomm EDL service tool with advanced flashing capabilities, one-click operations, Mi Fastboot support, and MTP bypass. Supports 725+ devices with auto-loader detection.",
      price: 700,
      originalPrice: 1000,
      category: "Desktop Application",
      rating: 4.9,
      downloads: 2850,
      tags: ["C#", "Qualcomm", "EDL", "Fastboot"],
      image: qualcommToolImage,
      images: [qualcommToolImage, qualcommCustomer1Image, qualcommCustomer2Image],
      demoVideo: "jq8m_wuOtbI",
      badge: "featured",
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
      price: 1400,
      originalPrice: 2000,
      category: "Desktop Application",
      rating: 4.9,
      downloads: 3200,
      tags: ["C#", "DevExpress", "Qualcomm", "MediaTek"],
      image: mifixProImage,
      demoVideo: "axP1xKrCCXU",
      badge: "featured",
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
      price: 630,
      originalPrice: 700,
      category: "Desktop Application",
      rating: 4.8,
      downloads: 1640,
      tags: ["C#", "Python", "MediaTek", "DevExpress"],
      image: mtkAuthToolImage,
      images: [mtkAuthToolImage, mtkAuthCustomerImage],
      demoVideo: "BRjVk82M3mY",
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
      price: 450,
      originalPrice: 500,
      category: "Desktop Application",
      rating: 4.8,
      downloads: 1920,
      tags: ["C#", "Samsung", "ADB", "AT Commands"],
      image: samFwFrpToolImage,
      demoVideo: "76hXl-EgqMo",
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
      price: 360,
      originalPrice: 400,
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
      id: 12,
      name: "ISP Programmer Tool",
      description: "Advanced ISP (In-System Programming) tool for direct eMMC/SD card flashing, partition management, FRP removal, and factory reset. Supports Qualcomm and MediaTek chipsets with low-level disk I/O via Windows API.",
      price: 450,
      originalPrice: 500,
      category: "Desktop Application",
      rating: 4.8,
      downloads: 980,
      tags: ["C#", "VB.NET", "eMMC", "GPT"],
      image: ispProgrammerImage,
      images: [ispProgrammerImage, ispProgrammerCustomerImage],
      features: [
        "Disk Detection - Detects removable storage (eMMC, SD cards) via WMI with model and size info; requires admin privileges",
        "GPT Partition Table - Reads and parses GUID Partition Table, displays partitions with name, size, and offset using 7-Zip",
        "Write Partitions - Flash .img partition images to specific partitions on the disk",
        "Read/Backup Partitions - Save selected partitions to .bin files using secinspect.exe",
        "Erase Partitions - Wipe selected partitions using dd.exe with /dev/zero; checkbox-based partition selection",
        "Factory Reset - Writes userdata partition to perform a complete factory reset",
        "FRP Removal - Erases FRP/config partition to bypass Factory Reset Protection lock",
        "Qualcomm & MediaTek Support - Chipset-specific operations for both QCOM and MTK devices",
        "Sparse Image Handling - Converts Android sparse .img files to raw images using simg2img.exe before writing",
        "Low-Level Disk I/O - Direct sector-level read/write using Windows API (CreateFile, ReadFile, WriteFile, DeviceIoControl)",
        "Background Worker - Progress reporting during long read/write operations via background thread",
        "Utility Tools - Includes 7-Zip, dd.exe, secinspect.exe, simg2img.exe, gdisk.exe and more disk utilities"
      ]
    },
    {
      id: 13,
      name: "Xiaomi Fire Tool",
      description: "Full-featured Xiaomi flashing and servicing tool with server authentication, credit system, ADB/Fastboot tools, EDL mode flashing, and MTK support. Connects to xiaomifiretool.in for auth and credit management.",
      price: 1050,
      originalPrice: 1500,
      category: "Desktop Application",
      rating: 4.9,
      downloads: 2430,
      tags: ["C#", "Xiaomi", "EDL", "Fastboot", "MediaTek"],
      image: xiaomiFireToolImage,
      demoVideo: "yiF6h_KmO9A",
      features: [
        "Server Authentication - User login/registration via xiaomifiretool.in with credit balance display and server status",
        "Credit System - Each auth operation costs 2 credits; real-time credit balance tracking",
        "Device Info - Displays serial number, codename, and bootloader status via ADB",
        "Image Flasher - Flash partitions (boot, recovery, system, modem, etc.) via Fastboot",
        "Rebooter - Reboot to system, fastboot, recovery, or EDL mode",
        "Wiper - Wipe cache or data + cache partitions",
        "OEM Unlocker/Locker - Lock and unlock bootloader via Fastboot",
        "Debloater - Uninstall bloatware apps from device",
        "Camera2 API - Enable/disable Camera2 HAL3 support",
        "Device Properties - Full device info retrieval via getprop",
        "MiFlash EDL Mode - Qualcomm & MTK support with auto device detection in EDL mode",
        "Firmware Flashing - Flash official firmware with Clean All, Save User Data, or Clean All & Lock options",
        "Firmware Validation - MD5/SHA256 image integrity check before flashing",
        "Script Management - Load and execute flash scripts with real-time multi-device progress tracking",
        "MTK Features - Scatter file, DA file, Auth file support, and ROM info management",
        "Utilities - Driver wizard, debug/info/warn/error logging, USB event watcher, auto-flash mode, multi-language support"
      ]
    },
    {
      id: 14,
      name: "Android SamFrp Tool",
      description: "Lightweight Samsung FRP bypass and ADB enabler tool. Detects Samsung modem ports, sends AT command sequences to enable USB debugging, resets FRP lock via ADB, and reads full device information.",
      price: 90,
      originalPrice: 100,
      category: "Desktop Application",
      rating: 4.6,
      downloads: 3180,
      tags: ["C#", "Samsung", "ADB", "FRP"],
      image: androidSamFrpImage,
      features: [
        "Enable ADB - Detects Samsung Mobile USB Modem port and sends AT command sequence to enable USB debugging",
        "AT Commands - Sends AT+DEVCONINFO, AT+KSTRINGB, AT+DUMPCTRL, AT+DEBUGLVC, AT+SWATD, AT+ACTIVATE in sequence",
        "FRP Reset - Bypasses FRP lock via ADB: inserts user_setup_complete, starts Google login activity, pushes frp.bin, reboots",
        "Read Device Info - Retrieves serial, brand, model, Android version, security patch, hardware, build number, PDA/BOOT/CSC versions",
        "Extended Info - Reads CPU ABI, country code, vendor GSM state, fingerprint, build date, and baseband version",
        "Device Detection - Auto-detects Samsung modem ports with refresh button to re-scan connected devices",
        "ADB Server Management - Automatically starts ADB server on application load"
      ]
    },
    {
      id: 15,
      name: "Android Service Tool",
      description: "Multi-brand Android servicing tool with Qualcomm EDL mode support, ADB device info, partition operations, FRP/lock removal, and a hardware-based license activation system. Covers Qualcomm, Samsung, MTK, Meizu, Mi-Oppo and more.",
      price: 315,
      originalPrice: 350,
      category: "Desktop Application",
      rating: 4.8,
      downloads: 1760,
      tags: ["C#", "Qualcomm", "EDL", "ADB", "MediaTek"],
      image: androidServiceToolImage,
      images: [androidServiceToolImage, androidServiceCustomerImage],
      features: [
        "Device Info (ADB) - Reads model, Android version, brand, build number, Knox version, CPU type, and hardware platform",
        "EDL Port Detection - Auto-detects Qualcomm HS-USB QDLoader 9008 port and identifies CPU model automatically",
        "CPU Auto-detect - Supports MSM8x10, MSM8916/17, MSM8936/37, SDM660, MSM8953/76/96, and more Qualcomm chipsets",
        "Brand Auto-detect - Identifies Xiaomi, Huawei, Lenovo, Asus, Oppo, Vivo and other brands in EDL mode",
        "Firehose Programmer - Auto-sends appropriate .mbn/.elf firehose programmer per detected CPU",
        "GPT Partition Table - Reads and displays partition info: name, start LBA, size in MB/GB, file name",
        "Partition Write/Erase - Flash or wipe partitions by name or sector range in EDL mode",
        "Partition Backup/Restore - Back up and restore partitions to/from files",
        "XML Firmware Flash - Flashes firmware packages using rawprogram.xml and patch.xml",
        "FRP Removal - Factory Reset Protection bypass for supported devices",
        "Lock Reset - User lock/pattern/password reset via userdata partition manipulation",
        "Vivo Network Unlock - Network unlock and IMEI protection support for Vivo devices",
        "Mi Account Disable - Disables Mi Account lock on Xiaomi devices",
        "License Activation - Hardware-based license using TripleDES, SHA hashing, and Rijndael encryption",
        "Dependencies - emmcdl.exe, adb.exe, fastboot.exe, fh_loader.exe, flash_tool.exe, ICSharpCode.SharpZipLib"
      ]
    },
    {
      id: 16,
      name: "Key Generator (Keygen)",
      description: "Lightweight C# keygen tool that generates 19-character hyphenated license keys from a base input string. Includes clipboard copy, run-count tracking, and a Topup system for distributing keys to end users.",
      price: 23,
      originalPrice: 25,
      category: "Desktop Application",
      rating: 4.5,
      downloads: 4210,
      tags: ["C#", "License", "Keygen", "WinForms"],
      image: keyGeneratorImage,
      features: [
        "Base Input - Accepts a user-provided base string (System Product ID) to seed key generation",
        "Custom Key Generation - GetChar() maps digits 0–9 to letters; GetNum() maps letters A–Z to digits",
        "Key Format - Outputs a 19-character hyphenated key in XXXX-XXXX-XXXX-XXXX format",
        "Key Display - Shows generated key in a read-only output field",
        "Copy to Clipboard - One-click copy of the generated key",
        "Topup System - Secondary form accepts System Product ID and TopUp Key for run-count top-up",
        "Run Tracking - Built-in application run counter (default 999 runs, adjustable via key positions)",
        "Close Button - Simple exit functionality built into the UI"
      ]
    },
    {
      id: 17,
      name: "MYM Pro Tool",
      description: "Universal multi-chip Android servicing tool supporting Qualcomm EDL, MediaTek, eMMC ISP, Samsung, and Fastboot modes. Includes Format Data, FRP erase, Mi Cloud disable, NV backup/restore, bootloader relock, and a built-in security scanner.",
      price: 270,
      originalPrice: 300,
      category: "Desktop Application",
      rating: 4.9,
      downloads: 1580,
      tags: ["C#", "Python", "Qualcomm", "MediaTek", "EDL"],
      image: mymProToolImage,
      features: [
        "Qualcomm EDL Mode - Connects via HS-USB QDLoader 9008; uses emmcdl.exe and fh_loader.exe for operations",
        "MediaTek Support - Python-based MTK flashing logic with 18+ preloaders (MT6750, MT6765, MT6769, MT6771, and more)",
        "Fastboot Mode - Flash, reboot, and check device info via Fastboot protocol",
        "eMMC ISP Mode - Direct ISP-level eMMC access for low-level operations",
        "Samsung Mode - Dedicated Samsung device support tab",
        "Format Data - Wipe userdata partition for factory reset",
        "Erase FRP - Bypass Factory Reset Protection on supported devices",
        "Bootloader Relock - Relock bootloader via Fastboot",
        "Disable Mi Cloud - Remove Xiaomi Mi Account lock",
        "Backup / Restore NV Data - Back up and restore Non-Volatile memory (IMEI, calibration data)",
        "Erase NV Data - Wipe NV partition when required",
        "Partition Management - Read/write GPT info; supports both eMMC and UFS memory types",
        "Auth Bypass - Checks and handles device authentication requirements",
        "Raw Drive Access - Direct raw disk drive read/write",
        "Qualcomm Chips - MSM8916/17/37/40, SDM439/450/636/660/665 and more",
        "Security Scanner - Detects and kills reverse-engineering tools (dnSpy, IDA, x64dbg, etc.)"
      ]
    },
    {
      id: 18,
      name: "Qualcomm Tool Version 1.1",
      description: "Multi-brand Qualcomm servicing tool with ADB, Fastboot, EDL (9008), and Sideload modes. Covers Xiaomi Mi Account bypass/reset, FRP removal, Oppo user lock/FRP removal, factory reset, and device info reading across a wide range of models.",
      price: 45,
      originalPrice: 50,
      category: "Desktop Application",
      rating: 4.7,
      downloads: 2890,
      tags: ["C#", "Qualcomm", "EDL", "Xiaomi", "Oppo"],
      image: qualcommToolV1Image,
      features: [
        "ADB Mode - Connect to devices in normal Android debug mode",
        "Fastboot Mode - Connect to devices in bootloader mode; check bootloader lock status",
        "Qualcomm EDL Mode - Connect via QDLoader 9008 COM port for low-level operations",
        "Sideload Mode - Factory reset support for MIUI devices in sideload mode",
        "Mi Account Bypass (ADB) - Disables Find Device and Cloud Service apps then reboots",
        "Mi Account Reset (EDL) - Writes patched persist partition to remove Mi Account lock",
        "Mi FRP Reset (EDL) - Resets Factory Reset Protection for Xiaomi devices",
        "Factory Reset (Sideload) - Wipes user data via Mi Sideload mode",
        "Read Device Info - Brand, model, Android version, build, CPU type, bootloader status, MIUI info",
        "Oppo User Lock Remove (EDL) - Removes PIN/password/pattern lock for Oppo A/F/R series",
        "Oppo FRP Remove (EDL) - Resets FRP lock for Oppo devices",
        "Xiaomi Models - Mi 3/4/5/6/8/MIX/Note/Pad, Redmi Note/Pro/Prime/S2 series and more",
        "Oppo Models - A31/33/37/51/53/57/71/77, F1/F3Plus, R7/R9/R9s/X9006 and more",
        "Tools Used - adb.exe, fastboot.exe, miadb.exe, emmcdl.exe, fh_loader.exe, firehose .mbn/.elf files, Ionic.Zip"
      ]
    },
    {
      id: 19,
      name: "All in One Bypass iCloud V6",
      description: "Comprehensive iOS activation lock bypass tool supporting GSM, MEID, and broken baseband bypass, MDM unlock, passcode bypass, Apple ID removal, and untethered bypass. Uses SSH/libimobiledevice for deep device access on jailbroken iOS.",
      price: 450,
      originalPrice: 500,
      category: "Desktop Application",
      rating: 4.8,
      downloads: 1340,
      tags: ["C#", "iOS", "iCloud Bypass", "SSH", "MDM"],
      image: allInOneBypassImage,
      features: [
        "USB Device Detection - Connects and detects iOS devices; retrieves serial, UDID, iOS version, model, IMEI/MEID, activation state",
        "Jailbreak Detection - Detects jailbreak status and establishes SSH connectivity to the device",
        "GSM Bypass - Activation lock bypass with full cellular signal support",
        "MEID Bypass (N/S) - Activation lock bypass without signal for MEID devices",
        "Broken Baseband Bypass - Bypass for devices with broken or missing baseband hardware",
        "MDM Unlock - Removes Mobile Device Management profiles from locked iOS devices",
        "Passcode Bypass - Bypass via backup extraction and activation restore",
        "Apple ID Removal - Removes Apple ID lock via hidden account menu",
        "App Patching - Patches installed apps for compatibility post-bypass",
        "A11 Device Erasure - Erase iOS 14+ A11 chip devices (Erase iOS 14 - A11)",
        "Banking App Fix - Patches banking apps to work correctly after bypass",
        "USB Patching - Patches USB communication layer for device access",
        "Disable OTA - Disables over-the-air iOS update prompts",
        "Anti-Reset - Applies settings to prevent accidental device reset",
        "SSH/SCP Access - File system mounting, modification, and plist editing on jailbroken devices",
        "libimobiledevice - Uses ideviceinfo, idevicepair, ideviceactivation and related utilities",
        "Untethered Bypass - Persistent bypass that survives reboots via Cydia Substrate tweaks"
      ]
    },
    {
      id: 20,
      name: "Fastboot Flasher",
      description: "Xiaomi fastboot firmware flashing tool with partition parsing, A/B slot support, Mi Cloud disable patch, and color-coded log output. Supports full firmware flashing from flash_all.bat scripts.",
      price: 225,
      originalPrice: 250,
      category: "Desktop Application",
      rating: 4.8,
      downloads: 980,
      tags: ["C#", "Fastboot", "Xiaomi", "Android"],
      image: fastbootFlasherImage,
      badge: "new",
      features: [
        "Firmware Selection & Parsing - Browse and select Xiaomi fastboot firmware folders, parses flash_all.bat to extract flashable partitions",
        "Firmware Validation - Checks for images folder and flash script to ensure firmware structure integrity",
        "Device Information - Detects connected Android devices, shows bootloader status (locked/unlocked), displays product name",
        "A/B Partition Support - Checks slot count and supports A/B slot selection and setting active slot",
        "Flashing Capabilities - Erases boot and metadata partitions first, then flashes selected partitions from parsed firmware",
        "Verified Boot Disable - Optional vbmeta.img flash with --disable-verity --disable-verification flags",
        "Mi Cloud Disable Patch - Modifies NON-HLOS.bin to disable Mi Cloud on Qualcomm devices",
        "Partition Selection - Checkbox list to select which partitions to flash with Select All / Unselect All buttons",
        "Auto Reboot - Optional automatic device reboot after flashing completes",
        "Color-coded Log Output - Rich text log box with color-coded status messages for easy debugging",
        "Double-click Firmware Load - Load firmware folder quickly by double-clicking",
      ],
    },
    {
      id: 21,
      name: "No Need VPN Bypass Tool",
      description: "Multi-mode Xiaomi Mi Account bypass tool supporting ADB, Sideload, Fastboot, and EDL modes. Removes Mi Account, FRP, and user locks across 30+ Xiaomi/Redmi devices without VPN requirements.",
      price: 135,
      originalPrice: 150,
      category: "Desktop Application",
      rating: 4.8,
      downloads: 1420,
      tags: ["C#", "Xiaomi", "EDL", "ADB", "Qualcomm"],
      image: noNeedVpnImage,
      badge: "new",
      features: [
        "ADB & Sideload Mode - Device info retrieval (phone name, MIUI version, Android version, serial, region), user lock removal, device reboot",
        "Fastboot Mode - Model name & bootloader state retrieval, anti-rollback version check, bootloader unlock check, reboot to EDL",
        "Fastboot Operations - User lock removal, FRP lock removal, recovery image flashing, boot image flashing",
        "EDL Mi Account Remove/Bypass - Multiple bypass methods for different Xiaomi/Redmi models without VPN",
        "EDL FRP Lock Removal - Factory Reset Protection bypass for Qualcomm-based Xiaomi devices in EDL mode",
        "EDL User Lock Removal - PIN/pattern/password removal via EDL partition operations",
        "Modem Backup/Restore - Backup and restore modem, modemst1, modemst2, and persist partitions",
        "Bootloader Unlock (EDL) - Unlock support for specific models including Mi Max 2 and Mi 5 Plus",
        "30+ Device Support - Mi 4/5/6/8, Redmi 3/4/5/6, Redmi Note series and more Xiaomi/Redmi models",
        "Test Point Images - Visual test point guides for each supported device model",
        "Custom Dark UI - Custom-drawn controls with rounded corners, dark theme ComboBox and ContextMenuStrip",
        "Qualcomm Libraries - Powered by L4AT_QualcommLib, MyLibrary, and miko_cpu_check for low-level operations",
      ],
    },
    {
      id: 22,
      name: "Telegram Web-K [ OptimaGram Premium ]",
      description: "Premium Telegram Web-K client with advanced subscription management, fast message templates, two-way translation, auto-reply engine, and cross-device cloud sync. Built on Supabase with device fingerprinting security.",
      price: 910,
      originalPrice: 1300,
      category: "E-Commerce Platform",
      rating: 4.9,
      downloads: 980,
      tags: ["TypeScript", "Telegram", "Supabase", "Web", "E-Commerce"],
      image: optimaGramImage,
      badge: "new",
      features: [
        "Subscription System (Supabase) - Device fingerprinting for security, persistent encrypted local storage for subscription tokens, free trial mode, paywall UI on expiry, auto-renewal prompts, and full subscription bootstrap/state management",
        "Quick Messages Templates - Predefined message templates supporting text, images, and video. Edit mode: create, edit, reorder, and delete templates. Template matching modes: exact, contains, starts with",
        "Media Uploads - Upload images and videos directly to Telegram with inline previews from within templates",
        "Language Format - Two-way translation configuration with 'Your language' and 'Client language' selectors supporting 15+ languages. Layout style options and auto-reply toggle",
        "Fast Messages Auto Reply - Listens to incoming messages and automatically replies when a message matches a template trigger",
        "Loop Prevention - Ignores outgoing messages and own Saved Messages, throttles to 1 auto-reply per peer every 30 seconds, remembers recent replies to prevent echo loops",
        "Fast Messages Cloud Sync - Synchronises Fast Messages templates across devices using your Saved Messages chat",
        "Hidden Sync Marker - Templates stored as a hidden, pinned message in Saved Messages with marker header to prevent accidental edits",
        "Debounced Saves - 3-second debounce on cloud saves to avoid API spam, with automatic cleanup of old sync markers",
        "Multi-account Sessions - Up to 20 signed-in accounts, ~45–55 MB RAM per active session, multi-profile switcher with isolated per-account data",
        "Show Deleted Messages - Integrated in Chat View with top-bar toggle, inline recovery rows, date grouping, and live-vs-history dedupe",
        "Recovery Deleted Data - Database-backed recovery with local history store, media re-download, and in-thread preview",
        "Premium Active UI - All premium features listed per-row with unlock modes clearly shown in the OptimaGram Premium features panel",
      ],
    },
    {
      id: 23,
      name: "Fastboot Erase Tool",
      description: "Lightweight .NET 4.8 fastboot utility for FRP unlock, SecureBoot unlock, and device reboot via fastboot commands. Includes auto device detection with configurable timeout and a color-coded real-time log window.",
      price: 450,
      originalPrice: 500,
      category: "Desktop Application",
      rating: 4.7,
      downloads: 0,
      tags: ["C#", "Fastboot", "Android", ".NET"],
      image: fastbootEraseToolImage,
      demoVideo: "K2R9lTNdcuE",
      badge: "new",
      features: [
        "Fastboot Device Detection - FindfastbootDevice() scans for connected fastboot devices with configurable timeout (default 60 seconds) and reports status in the log window",
        "FRP Unlock - Sends fastboot oem frp-unlock [command] to the device using a user-supplied unlock key entered in the text box",
        "SecureBoot Unlock - Sends fastboot oem unlock [command] to the device using the same unlock key input field",
        "Device Reboot - Reboots the connected fastboot device using the fastboot reboot command",
        "Color-coded Log Output - RichTextBox log with LOG_NORMAL (Light Cyan), LOG_WARNING (Yellow), and LOG_ERROR (Red) message types",
        "Status Indicator - PictureBox shows pass/fail images from Resources to visually indicate operation success or failure",
        "AdbHandler Class - Includes DLL imports for AdbRemoteCtrl.dll for extended ADB remote control capability",
        "Technical Stack - Targets .NET Framework 4.8, uses fastboot.exe internally for all device communication",
      ],
    },
    {
      id: 24,
      name: "Android Tool",
      description: "Multi-mode Android servicing tool for Xiaomi (Qualcomm/EDL), MediaTek, and Fastboot devices. Covers Mi Account removal, FRP erase, bootloader unlock, firmware flashing, and essential Windows tool installers — all in one tabbed interface.",
      price: 15,
      originalPrice: 17,
      category: "Desktop Application",
      rating: 4.7,
      downloads: 0,
      tags: ["C#", "Qualcomm", "EDL", "MediaTek", "Fastboot"],
      image: androidToolImage,
      badge: "new",
      features: [
        "Xiaomi (EDL) Tab - Pre-configured support for 12 Xiaomi/Redmi devices: YSL, Jason, Ugglite, Ugg, Whyred, Tulip, Lavender, Ginkgo, Oxygen, Nitrogen, Wayne, Platina",
        "Mi Account Remove (Erase) - Erases Mi Account lock partition via EDL mode for supported Qualcomm devices",
        "Mi Account Remove (Write) - Writes patched partition to bypass Mi Account lock via EDL",
        "EU ROM Bypass - Bypasses region restrictions via TWRP for EU ROM installation",
        "Mi Root - Root operation for already-rooted Qualcomm Xiaomi devices",
        "Bootloader Unlock (BLU) - Unlocks bootloader on supported Xiaomi devices via EDL",
        "Modem/Firmware Patching - Modifies NON-HLOS.bin for modem-level firmware patching",
        "MediaTek Tab - Integrates BKerler's mtkclient (Python required) for Auth Bypass, Factory Reset, Factory Reset (Keep Data), FRP Erase, Bootloader Unlock, and Mi Account Erase",
        "Fastboot Tab - Parse and flash Xiaomi fastboot firmware, unlock bootloader, erase FRP partition, launch MiUnlock.exe for Mi Sig Unlock, and read device info (bootloader status, product name, slot count)",
        "Windows Tools Tab - One-click installers for Python, ADB, MTK Driver, USBDK, and Disable Driver Signature Enforcement",
        "JJLab.Android Library - Powers all EDL/fastboot/ADB operations with low-level device communication",
        "C# WinForms (.NET Framework) - Clean tabbed UI with real-time log output and device status",
      ],
    },
    {
      id: 25,
      name: "MiFlash CSharp Native NoAuth",
      description: "Open-source C# re-implementation of MiFlash for flashing Xiaomi devices via Qualcomm EDL protocol with authentication bypass for select chipsets. Supports Snapdragon 636, 680, 845, 855, 860, and 870.",
      price: 0,
      originalPrice: 0,
      category: "Desktop Application",
      rating: 4.8,
      downloads: 0,
      tags: ["C#", "Qualcomm", "EDL", ".NET", "Open Source"],
      image: miflashNoAuthImage,
      badge: "new",
      githubUrl: "https://github.com/HadiKhoirudin/MiFlash_CSharp_Native_NoAuth",
      features: [
        "EDL Flashing - Flashes Xiaomi Android devices using Qualcomm EDL (Emergency Download) protocol",
        "Supported Chipsets - Snapdragon 636, 680, 845, 855, 860, and 870",
        "Clean All - Flash all partitions using flash_all.bat",
        "Save User Data - Flash all except user data partitions using flash_all_except*.bat",
        "Clean All and Lock - Flash all partitions and lock bootloader using flash_all_lock.bat",
        "Auto Device Detection - Automatically detects connected Xiaomi devices in EDL mode",
        "Multi-Device Flashing - Flash multiple devices simultaneously",
        "Real-Time Progress - Visual progress bars with flash status, time elapsed, and result",
        "Authentication Bypass - Bypasses Xiaomi server auth via SLA_Challenge.dll (No Auth mode)",
        "User Info Management - Login, permissions check, and user account management",
        "Driver Installation Assistant - Guided driver setup for Qualcomm EDL devices",
        "Flash Configuration - Read-back verify, dump options, verbose logging, COM port config",
        "SHA-256 Validation - Firmware integrity check before flashing",
        "Firmware Download - Built-in firmware download support",
        "Factory Mode Support - MES and X5MES factory mode operations",
        "TCP/IP Remote Control - Remote flashing support over TCP/IP",
        "Bilingual UI - Full Chinese and English language support",
        "Technologies - C# .NET Framework 4.0, Windows Forms, Win32 P/Invoke, Qualcomm Sahara & Firehose protocols",
      ],
    },
    {
      id: 26,
      name: "Auth Loader for Android — Xiaomi",
      description: "Complete end-to-end system for Xiaomi/Android firmware engineering and device unlocking. Python CLI client + Node.js Express API with PostgreSQL audit logging, HMAC-SHA256 signed requests, and support for Qualcomm EDL, MTK BROM, Mi Assistant, ADB, and Fastboot modes.",
      price: 0,
      originalPrice: 0,
      category: "Desktop Application",
      rating: 4.8,
      downloads: 0,
      tags: ["Python", "Node.js", "Qualcomm", "MediaTek", "Xiaomi", "Open Source"],
      image: authLoaderXiaomiImage,
      badge: "new",
      githubUrl: "https://github.com/Erkan3034/auth-loader-for-android_xiaomi",
      features: [
        "Qualcomm EDL Mode — Emergency Download Mode for Snapdragon chipsets with Xiaomi authorized account bypass",
        "MTK BROM Mode — Boot ROM Mode for MediaTek chipsets with authentication key support",
        "Xiaomi Mi Assistant — Xiaomi-specific proprietary connection mode",
        "Generic Modes — Standard ADB and Fastboot support for broad device compatibility",
        "HMAC SHA256 Authentication — All API requests are cryptographically signed to prevent tampering",
        "Time-Limited Auth Keys — 5-minute expiration on auth tokens prevents unauthorized key reuse",
        "Timestamp Validation — Server-side replay attack prevention via strict timestamp checks",
        "Rate Limiting — Global and per-API rate limits to prevent brute-force and abuse",
        "Input Validation — Comprehensive sanitization on all inputs to prevent injection attacks",
        "Secure Database Logging — PostgreSQL-based audit trail for all device operations",
        "Python Client Tool — Cross-platform CLI with multi-mode device detection, interactive menu system, and mock device support for safe testing",
        "Node.js API Server — Express-based backend with PostgreSQL integration and structured JSON responses",
        "FRP Unlock — Factory Reset Protection bypass via authenticated API calls",
        "Mock Testing — Simulated device environment for development and QA without real hardware",
        "Configuration Management — JSON and environment variable based config for easy deployment",
        "Docker Support — Production-ready Docker and Nginx deployment configuration",
        "Professional Packaging — Multiple batch scripts for professional tool delivery and distribution",
        "Comprehensive Logging — Detailed structured logs on both Python client and Node.js server sides",
      ],
    },
    {
      id: 27,
      name: "HWID Login Form — Keygen Generator",
      description: "Dual-component .NET hardware-locked licensing system. A keygen generates MD5-based keys from any ID input, while a registration form reads the machine's Processor ID via WMI, validates a user-supplied key, and persists the registration to disk.",
      price: 36,
      originalPrice: 40,
      category: "Desktop Application",
      rating: 4.6,
      downloads: 0,
      tags: ["C#", "WinForms", ".NET", "License", "Keygen", "HWID"],
      image: hwidKeygenImage,
      badge: "new",
      features: [
        "ID-to-Key Generation — Accepts any string ID input, computes its MD5 hash, and extracts the first 11 characters of the hex digest as the license key",
        "One-Click Generate — Single button triggers hash computation and displays the result instantly",
        "Hardware ID Binding — Registration form reads the machine's Processor ID via WMI (Win32_Processor) to uniquely identify the hardware",
        "MD5 Registration Key — Derives a 19-character registration key from the Processor ID using MD5 with x5 formatting",
        "Key Validation — Compares the user-entered key against the expected hardware-derived key and shows success or error feedback",
        "Persistent Registration — Saves the Processor ID and registration date to a regi.dat file on successful activation",
        "Startup Check — On launch, detects an existing regi.dat file and skips the registration prompt if already activated",
        "Status Display — Shows current registration status and starting date in the main application UI",
        "Hardware ID Display — Renders the machine's Hardware ID in the registration panel for easy copy-paste into the keygen",
        "Targets .NET Framework 4.5.2 / 4.7.2 / 4.8 — Compatible with a wide range of Windows environments",
        "Minimal WinForms UI — Lightweight Windows Forms interface with no external dependencies",
      ],
    },
];

export function BuySourceCode() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<SourceCodeItem | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const closeZoom = useCallback(() => setZoomedImage(null), []);

  useEffect(() => {
    if (!zoomedImage) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeZoom(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomedImage, closeZoom]);

  const categories = ["All", ...Array.from(new Set(sourceCodeItems.map((item) => item.category))).sort()];

  const filteredItems = sourceCodeItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl mb-4 text-white">Buy Source Code</h1>
        <p className="text-xl text-gray-300 mb-8">
          Browse our collection of premium, ready-to-use source code for your projects.
        </p>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search source code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-slate-800/60 text-slate-300 border-white/10 hover:border-blue-400 hover:text-blue-300 backdrop-blur-sm"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className={`ml-1.5 text-xs ${selectedCategory === cat ? "text-blue-200" : "text-slate-500"}`}>
                  ({sourceCodeItems.filter((i) => i.category === cat).length})
                </span>
              )}
              {cat === "All" && (
                <span className={`ml-1.5 text-xs ${selectedCategory === cat ? "text-blue-200" : "text-slate-500"}`}>
                  ({sourceCodeItems.length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Source Code Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="flex flex-col overflow-hidden">
            {item.image && (
              <div
                className="w-full h-48 bg-slate-800/60 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity relative"
                onClick={() => setSelectedProduct(item)}
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.badge === "new" && (
                  <span className="absolute top-2 left-2 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                    NEW
                  </span>
                )}
                {item.badge === "featured" && (
                  <span className="absolute top-2 left-2 bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                    ⭐ FEATURED
                  </span>
                )}
                {item.demoVideo && (
                  <a
                    href={`https://www.youtube.com/watch?v=${item.demoVideo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-2 left-2 flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md transition-colors"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    Watch Demo
                  </a>
                )}
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary">{item.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-slate-200">{item.rating}</span>
                </div>
              </div>
              <CardTitle className="text-xl">{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {item.features && item.features.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm mb-2 text-slate-300 font-medium">Key Features:</p>
                  <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
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
                  <Badge key={tag} variant="outline" className="text-xs text-slate-300 border-slate-500">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span>{item.downloads.toLocaleString()} downloads</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-white">${item.price}</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs font-semibold">
                    {item.originalPrice >= 1000 ? "30% OFF" : "10% OFF"}
                  </Badge>
                </div>
                <span className="text-sm text-gray-400 line-through">${item.originalPrice}</span>
                {item.demoVideo && (
                  <a
                    href={`https://www.youtube.com/watch?v=${item.demoVideo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 mt-1.5 font-medium transition-colors"
                  >
                    <PlayCircle className="w-3 h-3" />
                    Watch Demo
                  </a>
                )}
              </div>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-slate-400">No source code found matching your search.</p>
        </div>
      )}

      {/* Zoom Lightbox */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeZoom}
        >
          <button
            onClick={closeZoom}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/25 text-white rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={zoomedImage}
            alt="Zoomed view"
            className="max-w-[92vw] max-h-[92vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
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
                  <div
                    className="w-full rounded-lg overflow-hidden bg-slate-800/60 relative group cursor-zoom-in"
                    onClick={() => setZoomedImage(selectedProduct.image!)}
                    title="Click to zoom"
                  >
                    <ImageWithFallback
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-auto object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 pointer-events-none">
                      <div className="bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <ZoomIn className="w-3.5 h-3.5" />
                        Click to zoom
                      </div>
                    </div>
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
                              <p className="text-white">{title}</p>
                              {description && (
                                <p className="text-sm text-slate-400 mt-1">{description}</p>
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

                <div className="flex items-center gap-4 text-sm text-slate-400">
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
