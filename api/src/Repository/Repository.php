<?php
/**
 * Created by PhpStorm.
 * User: BK
 * Date: 02.11.17
 * Time: 15:06
 */
namespace Repository;

use Symfony\Component\Yaml\Yaml;

abstract class Repository
{
    /**
     * @var string
     */
    protected $table;

    /**
     * @var \PDO
     */
    protected $pdo;

    /**
     * Repository constructor.
     */
    public function __construct()
    {
        $settings = Yaml::parse(file_get_contents(__DIR__ . '/../../config/database.yml'));

        if (!array_key_exists('host', $settings)) {
            throw new \UnexpectedValueException('Database host missing!');
        }
        $host = $settings['host'];

        if (!array_key_exists('port', $settings)) {
            throw new \UnexpectedValueException('Database port missing!');
        }
        $port = $settings['port'];

        if (!array_key_exists('db', $settings)) {
            throw new \UnexpectedValueException('Database db missing!');
        }
        $db = $settings['db'];

        if (!array_key_exists('user', $settings)) {
            throw new \UnexpectedValueException('Database user missing!');
        }
        $user = $settings['user'];

        if (!array_key_exists('password', $settings)) {
            throw new \UnexpectedValueException('Database password missing!');
        }
        $password = $settings['password'];

        $dsn = "mysql:host=$host;dbname=$db;port=$port";

        $this->pdo = new \PDO($dsn, $user, $password);
    }

}