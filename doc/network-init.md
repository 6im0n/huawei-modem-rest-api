# Configure the Network for the Modem and the Initial Connection

This guide explains how to configure the network interfaces for the Huawei LTE modem. The goal is to use the modem as a platform to send and receive SMS while utilizing the Ethernet connection for communication with the rest of the world.

## **Example Network Interface Configuration**

Here is an example configuration file for the network interface:

```bash
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
allow-hotplug eth0
iface eth0 inet dhcp
# This is an autoconfigured IPv6 interface for the primary interface
iface eth0 inet6 auto

# Huawei modem
allow-hotplug <huawei-modem>
iface <huawei-modem> inet dhcp
        post-up ip route del default dev <huawei-modem> #
```

## **Explanation of Each Line Related to the Modem**

### `allow-hotplug <huawei-modem>`
This line specifies that the modem's network interface (`<huawei-modem>`) should be activated automatically when it is plugged in or detected by the system.

- **`allow-hotplug`**: Ensures that the system dynamically brings up the interface when the hardware is detected.
- **`<huawei-modem>`**: This is the unique identifier for the Huawei modem's network interface. The name may vary depending on your system and hardware.

### `iface <huawei-modem> inet dhcp`
This line configures the modem's interface to use DHCP (Dynamic Host Configuration Protocol) for acquiring an IP address.

- **`iface`**: Defines a network interface.
- **`inet`**: Specifies that the interface is configured for IPv4.
- **`dhcp`**: Indicates that the IP address will be assigned dynamically by a DHCP server.

### `post-up ip route del default dev <huawei-modem>`
This command runs after the interface is brought up (`post-up`). It removes the default route associated with the modem interface to prevent it from overriding the primary interface's route.

- **`post-up`**: A command executed immediately after the interface is activated.
- **`ip route del default dev <huawei-modem>`**: Deletes the default route for the modem. This ensures the modem is used only for modem-specific tasks like SMS, while the Ethernet connection (`eth0`) handles general internet traffic.

## **Bringing Up the Interface Using `ip`**

The steps to bring up the modem interface depend on how the modem is connected to your system:

- **For smaller models connected via USB**, the modem will appear as a USB network interface (e.g., `usb0` or `enx...`).
- **For larger models with an Ethernet port**, the modem will appear as an Ethernet network interface (e.g., `eth1` or `enx...`).

Once the modem interface has been identified, you can bring it up manually using the `ip` command:

1. Open a terminal.
2. Use the following command to activate the modem's interface:
   ```bash
   sudo ip link set <huawei-modem> up
   ```
3. Verify that the interface is up by running:
   ```bash
   ip addr show <huawei-modem>
   ```
   You should see details like the assigned IP address.

## **Finding the Interface Identifier**

To configure the modem, you need to know its network interface identifier (e.g., `<huawei-modem>`). Follow these steps to find it:

### Using `ip link`
1. Open a terminal on your system.
2. Run the command:
   ```bash
   ip link
   ```
3. Look for the interface corresponding to your modem. It will usually have a name starting with `enx` or `usb` and may include the modem’s MAC address.

### Using `lsusb`
1. Verify the modem is detected by running:
   ```bash
   lsusb
   ```
2. Note the device name and use `ip link` to map it to a network interface.

## **Additional Notes**
- Make sure to replace `<huawei-modem>` with the actual identifier of your Huawei modem interface, which can be found using the above methods.
- Use `sudo service networking restart` or reboot your system to apply changes after modifying the configuration file.

By following this configuration, you can effectively manage the Huawei modem for SMS services while maintaining a stable Ethernet connection for other network tasks.

