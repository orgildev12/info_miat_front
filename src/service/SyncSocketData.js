import Pusher from 'pusher-js';
// Enable pusher logging - don't include this in production
// Pusher.logToConsole = process.env.NODE_ENV !== 'production';
Pusher.logToConsole = false;

export const SyncSocketData = (setData, channelname, eventname, auth) => {
    // ApiService("post", API_GET_PASSPOLICY, { 'optionname': 'APPLICATION_ADDRESS' })
    //     .then((res) => {
    //         if (res && res.optionvalue) {
    // const ip_address = res.optionvalue.split(";");
    //         }
    //     })
    //     .catch((err) => console.error(err));
    // const { auth } = useAuth()
    const ip_address = auth.server_ip.split(";");
    ip_address.forEach(element => {
        if (element) {
            const pusher = new Pusher('me_core_d160f30add92a35dc15b', {
                wsHost: element,
                cluster: 'ap1',
                wsPort: process.env.NODE_ENV === 'production' ? window.location.port : 6001,
                wssPort: process.env.NODE_ENV === 'production' ? window.location.port : 6001,
                disableStats: true,
                forceTLS: false,
                authEndpoint: '/laravel-websockets/auth',
                auth: {
                    headers: {
                        'X-CSRF-Token': 'me_core_d160f30add92a35dc15b'
                    }
                },
                enabledTransports: ['ws', 'wss']
            });
            const channel = pusher.subscribe(channelname);
            channel.bind(eventname, function (data) {
                setData(data)
            });
        }
    });
}

export const isNotificationSupported = () => {
    return 'Notification' in window;
};

export const requestNotificationPermission = async () => {
    if (Notification.permission !== 'granted') {
        await Notification.requestPermission();
    }
};