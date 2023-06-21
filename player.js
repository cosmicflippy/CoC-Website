$(document).ready(function() {
    function fetchAndDisplayPlayerInfo(playerTag) {
        $.ajax({
            url: 'fetch_player_info.php',
            method: 'GET',
            data: {
                tag: playerTag
            },
            dataType: 'json',
            success: function(data) {
                // Handle missing clan data
                var clanName = data.clanName || '-';
                var clanLevel = data.clanLevel || '-';
    
                // Handle missing numeric values
                var attackWins = data.attackWins || 0;
                var defenseWins = data.defenseWins || 0;
                var receivedDonations = data.donationsReceived || 0;
    
                $('#player-info tbody').append(
                    '<tr>' +
                    '<td>' + data.name + '</td>' +
                    '<td>' + data.expLevel + '</td>' +
                    '<td>' + data.trophies + '</td>' +
                    '<td>' + clanName + '</td>' +
                    '<td>' + clanLevel + '</td>' +
                    '<td>' + data.role + '</td>' +
                    '<td>' + attackWins + '</td>' +
                    '<td>' + defenseWins + '</td>' +
                    '<td>' + data.donations + '</td>' +
                    '<td>' + receivedDonations + '</td>' +
                    '<td>' + data.warStars + '</td>' +
                    '<td>' + data.townHallLevel + '</td>' +
                    '<td><button class="delete-tag" data-tag="' + data.tag + '">Delete</button></td>' +
                    '</tr>'
                );
            },
            error: function(error) {
                console.log('Error:', error);
            },
        });
    }
    

    function refreshTable() {
        $.ajax({
            url: 'fetch_player_info_all.php',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                $('#player-info tbody').empty();

                for (var i = 0; i < data.length; i++) {
                    var player = data[i];
                    $('#player-info tbody').append(
                        '<tr>' +
                        '<td>' + player.name + '</td>' +
                        '<td>' + player.level + '</td>' +
                        '<td>' + player.trophies + '</td>' +
                        '<td>' + player.clan_name + '</td>' +
                        '<td>' + player.clan_level + '</td>' +
                        '<td>' + player.role + '</td>' +
                        '<td>' + player.attacks_won + '</td>' +
                        '<td>' + player.defenses_won + '</td>' +
                        '<td>' + player.donations + '</td>' +
                        '<td>' + player.received_donations + '</td>' +
                        '<td>' + player.war_stars + '</td>' +
                        '<td>' + player.townhall_level + '</td>' +
                        '<td><button class="delete-tag" data-tag="' + player.tag + '">Delete</button></td>' +
                        '</tr>'
                    );
                }
            },
            error: function(error) {
                console.log('Error:', error);
            },
        });
    }

    $('#fetch-player-info').click(function() {
        var playerTag = $('#player-tag-input').val();
        fetchAndDisplayPlayerInfo(playerTag);
    });

    $('#add-tag').click(function() {
        var playerTag = $('#player-tag-input').val();

        $.ajax({
            url: 'insert_player_tag.php',
            method: 'POST',
            data: {
                tag: playerTag
            },
            dataType: 'json',
            success: function(data) {
                if (data.success) {
                    fetchAndDisplayPlayerInfo(playerTag);
                }
            },
            error: function(error) {
                console.log('Error:', error);
            },
        });
    });

    $(document).on('click', '.delete-tag', function() {
        var playerTag = $(this).data('tag');
        var deleteButton = $(this);

        $.ajax({
            url: 'delete_player_tag.php',
            method: 'POST',
            data: {
                tag: playerTag
            },
            dataType: 'json',
            success: function(data) {
                if (data.success) {
                    deleteButton.closest('tr').remove();
                }
            },
            error: function(error) {
                console.log('Error:', error);
            },
            complete: function() {
                refreshTable();
            }
        });
    });

    refreshTable();
});
