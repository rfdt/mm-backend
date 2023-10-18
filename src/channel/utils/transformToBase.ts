export const transformToBase = (data) =>{
    return data.map(channel => ({
        id_tbcd: channel.id_tbcd,
        id_suz: channel.id_suz,
        id_oss: channel.id_oss,
        id_cms: channel.id_cms,
        client: channel.client,
        service: channel.service,
        service_size: channel.service_size,
        city: channel.city,
        street: channel.street,
        home: channel.home,
        add_info: channel.add_info,
        contact: channel.contact,
        status:channel.status,
        date: channel.date,
        note: channel.note,
        rd_sr: channel.rd_sr,
        channel_pe: channel.channel_verified ? channel.channel_pe : channel.inventory_channel_pe,
        channel_pe_port : channel.channel_verified ? channel.channel_pe_port : channel.inventory_channel_pe_port,
        channel_vid : channel.channel_verified ? channel.channel_vid : channel.inventory_channel_vid,
        channel_agg_stop: channel.channel_verified ? channel.channel_agg_stop.map(ch=>ch.agg_stop).join(" -> ") : channel.inventory_channel_agg_stop,
        channel_acc_stop: channel.channel_verified ? channel.channel_acc_stop.map(ch=>ch.acc_stop).join(" -> ") : channel.inventory_channel_acc_stop,
        zabbix: channel.zabbix,
        zabbix_avail: channel.zabbix_avail
    }))
}
